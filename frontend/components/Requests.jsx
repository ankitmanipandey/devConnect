import React, { useEffect } from 'react'
import RequestCard from './RequestCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../config/requestSlice'
import { setLoader } from '../config/switchSlice'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../hardcoded/constants'

export default function Requests() {
  const dispatch = useDispatch()
  const loader = useSelector(store => store?.switch?.loader)
  const { isMobileOptions } = useSelector(store => store.switch)
  const requestedUser = useSelector(store => store?.request)
  const handleRequest = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.get(`${BACKEND_URL}/user/pending/requests`, { withCredentials: true })
      dispatch(addRequests(res?.data?.connectionRequests))
      dispatch(setLoader(false))
    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error("Error in getting Requests")
    }
  }

  useEffect(() => {
    handleRequest()
  }, [])

  if (!requestedUser || requestedUser.length === 0)
    return (
      <p className='text-2xl md:text-4xl text-[#FEFFFE] text-center' >
        No Requests Available
      </p>)

  return loader ? <Loader /> : (
    < div className={`w-full h-screen flex flex-col mt-10 items-center gap-3 ${isMobileOptions ? "-z-10" : "z-auto"}`} >
      {requestedUser.map((user) => {
        return < RequestCard requestId={user?._id} key={user?.fromUserId?._id}
          isPremium={user?.fromUserId?.isPremium}
          userName={user?.fromUserId?.name} photoUrl={user?.fromUserId?.photoUrl} about={user.fromUserId?.about}
          skills={user.fromUserId?.skills.join(",")} />
      })}

    </ div>
  )
}
