import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRequests } from '../config/requestSlice'
import { setLoader } from '../config/switchSlice'
import Loader from './Loader'
import { toast } from "react-toastify"
import { BACKEND_URL } from '../hardcoded/constants'

export default function RequestCard({ userName, photoUrl, about, requestId, isPremium }) {
    const dispatch = useDispatch()
    const loader = useSelector(store => store?.switch?.loader)
    const handleReject = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/request/review/rejected/${requestId}`, {}, { withCredentials: true })
            dispatch(updateRequests(requestId))
            dispatch(setLoader(false))
            toast.success("Successfully Rejected")
        }
        catch (err) {
            toast.error("Cannot Reject this profile !")
        }
    }
    const handleAccept = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/request/review/accepted/${requestId}`, {}, { withCredentials: true })
            dispatch(updateRequests(requestId))
            dispatch(setLoader(false))
            toast.success("Accepted Successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Cannot Accept this profile")

        }
    }
    return loader ? <Loader /> : (
        <div className='h-72 w-72 p-5 flex flex-col items-center gap-2 md:h-28 md:w-[70%] bg-[#00092d] opacity-95 rounded-lg  md:flex md:flex-row md:justify-between md:p-3 text-[#FEFFFE] md:items-center'>
            <div className='flex flex-col md:flex-row items-center gap-2'>
                <img src={photoUrl} alt="" className='h-14 w-14 rounded-full m-1' />
                {isPremium && <i className="fa-regular fa-circle-check relative top-1 text-xl text-[#FEFFFE]"></i>}
            </div>
            <p>{userName}</p>
            <p>{about}</p>
            <div className='flex gap-4 p-2 font-medium text-[#FEFFFE]'>
                <button className='py-2 px-3 bg-pink-500 rounded-lg cursor-pointer transition-all duration-150 ease-in-out hover:scale-105' onClick={handleReject}>Reject</button>
                <button className='py-2 px-3 bg-blue-500 rounded-lg cursor-pointer transition-all duration-150 ease-in-out hover:scale-105' onClick={handleAccept}>Accept</button>
            </div>
        </div>
    )
}
