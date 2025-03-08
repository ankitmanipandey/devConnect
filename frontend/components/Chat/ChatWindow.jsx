import React, { useEffect, useRef, useState } from 'react'
import EmptyChat from './EmptyChat.jsx'
import "/src/chatscroller/style.css"
import { createSocketConnection } from '../../hardcoded/socket.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ChatWindow({ user }) {
    const BACKEND_URL = import.meta.VITE_BACKEND_URL
    const navigate = useNavigate()
    const loggedInUserId = user?._id
    const { targetUserId } = useSelector((store) => store.chat)
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    const { targetPhotoUrl } = useSelector(store => store.chat)
    const { targetUserName } = useSelector(store => store.chat)
    const chatEndRef = useRef(null)

    const getChatData = async () => {
        try {
            const res = await axios(`${BACKEND_URL}/get/chat/data/${loggedInUserId}/${targetUserId}`, { withCredentials: true })
            if (!res?.data?.success) {
                setChatMessages([])
            }
            setChatMessages(res?.data?.chatData)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        const newSocket = createSocketConnection()
        setSocket(newSocket)

        newSocket.emit("joinChat", { loggedInUserId, targetUserId })

        newSocket.on('messageReceived', (newMessage) => {
            const { chatMessage, senderId, createdAt } = newMessage
            setChatMessages((prev = []) => [...prev, { chatMessage, senderId, createdAt }])
        })

        return (() => {
            newSocket?.disconnect()
        })
    }, [loggedInUserId, targetUserId])


    const sendMessage = () => {
        if (!message.trim()) return

        socket.emit('sendMessage', {
            loggedInUserId,
            targetUserId,
            message
        })
        setMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            sendMessage()
    }

    useEffect(() => {
        if (!loggedInUserId || !targetUserId) return
        getChatData()
    }, [targetUserId])


    useEffect(() => {
        chatEndRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages]);

    return !targetUserId ? <EmptyChat />
        : (
            <>
                <div className='border-b-1 border-white h-[92%] md:h-[90%] overflow-y-auto scrollbar-hidden w-full'>

                    <div className='h-[12%] border-b-1 border-white flex items-center gap-1 sticky top-0 bg-gradient-to-r from-[#00092d]'>
                        <div className='h-full rounded-full flex items-center p-3 w-[25%] md:w-auto'>
                            <img src={targetPhotoUrl} alt="" className='rounded-full size-12 cursor-pointer' />
                        </div>
                        <div className='w-[90%] flex items-center'>
                            <p className='text-white font-semibold p-1 cursor-pointer text-lg md:text-2xl'>{targetUserName}</p>
                        </div>
                        <div className='ml-1 bg-pink-600 text-white h-10 flex md:hidden justify-center items-center rounded-xl transition-all duration-150 ease-in-out hover:bg-pink-700'>
                            <button className='px-4 py-2 cursor-pointer' onClick={() => navigate("/connections")}>Back</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-4 h-[88%] overflow-y-auto">
                        {chatMessages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`inline-block px-4 py-2 rounded-2xl relative m-2 ${msg?.senderId === loggedInUserId
                                    ? "self-end bg-[#0084ff] text-white rounded-br-sm"
                                    : "self-start bg-[#262d37] text-white rounded-bl-sm"
                                    }`}
                            >
                                <p>{msg?.chatMessage}</p>
                                <span className="text-xs opacity-60  bottom-[-18px] right-0">
                                    {new Date(msg?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                </div>

                <div className='h-[8%] md:h-[10%] flex gap-4 items-center bg-gradient-to-r from-[#00092d]'>
                    <form className='w-[90%] h-full ' onSubmit={(e) => e.preventDefault()}>
                        <input type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full h-full outline-none text-xl md:text-xl p-4 text-white'
                            placeholder='Write a message...'
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div className='bg-pink-700 text-white h-10 flex justify-center items-center rounded-xl transition-all duration-150 ease-in-out hover:bg-pink-600'>
                        <button type="button" className='px-4 py-2 cursor-pointer ' onClick={() => sendMessage()} > Send</button>
                    </div>

                </div >
            </>
        )
}
