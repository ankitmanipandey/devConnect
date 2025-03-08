import React, { useEffect } from 'react'
import RequestCard from './RequestCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../../config/Slices//requestSlice'
import { setLoader } from '../../config/Slices/switchSlice'
import Loader from '../Utilities/Loader'
import { toast } from 'react-toastify'
import EmptyStore from '../Utilities/EmptyStore'

export default function Requests() {
  const dispatch = useDispatch()
  const loader = useSelector(store => store?.switch?.loader)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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

  if (loader) {
    return <Loader />
  }

  return !requestedUser || requestedUser?.length === 0 ? <EmptyStore text={"Requests"} /> :
    (
      < div className={`w-full h-screen flex flex-col mt-10 items-center gap-3 ${isMobileOptions ? "-z-10" : "z-auto"}`} >
        {requestedUser.map((user) => {
          return < RequestCard requestId={user?._id} key={user?.fromUserId?._id}
            isPremium={user?.fromUserId?.isPremium}
            userName={user?.fromUserId?.name} photoUrl={user?.fromUserId?.photoUrl} about={user?.fromUserId?.about}
            skills={!user ? "Skills" : user?.fromUserId?.skills.join(",")} />
        })}

      </ div>
    )
}
