import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateConnections } from '../../config/Slices/connectionSlice'
import ConnectionDetailCard from './ConnectionDetailCard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setIsDetailCard, setLoader } from '../../config/Slices/switchSlice'
import Loader from '../Utilities/Loader'
import { setTargetPhotoUrl, setTargetUserId, setTargetUserName } from '../../config/Slices/chatSlice'

export default function ConnectionCard({ connection }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const loader = useSelector(store => store.switch.loader)
    const { isDetailCard } = useSelector(store => store.switch)

    const handleRemove = async () => {
        try {
            dispatch(setLoader(true))
            const res = await axios.delete(`${BACKEND_URL}/user/remove/connection/${connection?._id}`, { withCredentials: true })
            dispatch(updateConnections(connection?._id))
            dispatch(setLoader(false))
            toast.success("Connection removed successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Connection can't be removed")
        }
    }
    return loader ? <Loader /> : (
        <>
            <div className='h-72 w-72 p-5 flex flex-col items-center gap-2 md:h-28 md:w-[70%] bg-[#00092d] opacity-95 rounded-lg  md:flex md:flex-row md:justify-between md:p-3 text-[#FEFFFE] md:items-center'>
                <div className='flex flex-col items-center md:flex-row justify-center gap-2'>
                    <img src={connection?.photoUrl} alt="" className='h-14 w-14 rounded-full m-1' />
                    {connection?.isPremium && <i className="fa-regular fa-circle-check relative top-1 text-xl text-[#FEFFFE]"></i>}
                </div>
                <p>{connection?.name}</p>
                <p>{connection?.skills}</p>
                <div className='flex gap-4 p-2 font-medium text-[#FEFFFE]'>
                    <button className='py-2 px-3 bg-green-700 rounded-lg cursor-pointer transition-all duration-150 ease-in-out hover:scale-105' onClick={() => { dispatch(setTargetUserId(connection?._id)); dispatch(setTargetUserName(connection?.name)); dispatch(setTargetPhotoUrl(connection?.photoUrl)); navigate("/chat") }}>Chat</button>
                    <button className='py-2 px-3 bg-blue-500 rounded-lg cursor-pointer transition-all duration-150 ease-in-out hover:scale-105' onClick={() => { dispatch(setIsDetailCard(true)) }}>Details</button>
                    <button className='py-2 px-3 bg-red-500 rounded-lg cursor-pointer transition-all duration-150 ease-in-out hover:scale-105' onClick={handleRemove}>Remove</button>
                </div>
            </div >
            {isDetailCard && <ConnectionDetailCard connection={connection} />}

        </>
    )
}
