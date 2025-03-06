import React, { useEffect } from 'react'
import ConnectionCard from './ConnectionCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../config/connectionSlice'
import { setLoader } from '../config/switchSlice'
import { toast } from "react-toastify"
import Loader from './Loader'
import { BACKEND_URL } from '../hardcoded/constants'

export default function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)
  const { isMobileOptions } = useSelector(store => store.switch)
  const loader = useSelector(store => store.switch.loader)
  const fetchConnections = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.get(`${BACKEND_URL}/user/connections`, { withCredentials: true });
      dispatch(addConnections(res?.data?.finalData));
      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      toast.error("Could not get connections ")
    }
  };

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections || connections.length === 0)
    return (
      <p className='text-2xl md:text-4xl text-[#FEFFFE] text-center' >
        No Connections Available
      </p>)

  return loader ? <Loader /> : (
    <div className={`w-full h-screen flex flex-col p-2 items-center gap-3 ${isMobileOptions ? "-z-10" : "z-auto"}`}>
      {connections.map((connection) => <ConnectionCard key={connection._id} connection={connection} />)}
    </div>
  )
}
