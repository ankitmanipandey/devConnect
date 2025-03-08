import React, { useEffect } from 'react'
import UserCard from '../Feed/UserCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../config/Slices/feedSlice'
import { toast } from "react-toastify"
import { setLoader } from '../../config/Slices/switchSlice'
import Loader from '../Utilities/Loader'
import EmptyStore from '../Utilities/EmptyStore'

export default function Feed() {
  const dispatch = useDispatch()
  const feedUser = useSelector(store => store?.feed)
  const loader = useSelector(store => store?.switch?.loader)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const { isMobileOptions } = useSelector(store => store.switch)

  const handleFeed = async () => {
    dispatch(setLoader(true))
    try {
      const res = await axios.get(`${BACKEND_URL}/user/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data))
      dispatch(setLoader(false))
    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error("Feed not available")
    }

  }
  useEffect(() => {
    handleFeed()
  }, [])

  if (loader)
    return <Loader />

  return !feedUser || feedUser?.length === 0 ? <EmptyStore text={"Feed"} />
    :
    (
      <div className={`w-full h-screen flex justify-center items-center ${isMobileOptions ? "-z-10" : "z-auto"}`}>
        {feedUser?.map((user) => { return < UserCard userId={user?._id} key={user?._id} userName={user?.name} about={user?.about} isPremium={user?.isPremium} photoUrl={user?.photoUrl || "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg"} /> })}
      </div>
    )

}
