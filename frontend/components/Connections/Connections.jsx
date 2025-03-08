import React, { useEffect } from 'react'
import ConnectionCard from '../../components/Connections/ConnectionCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../../config/Slices/connectionSlice'
import { setLoader } from '../../config/Slices/switchSlice'
import { toast } from "react-toastify"
import Loader from '../Utilities/Loader'
import EmptyStore from '../Utilities/EmptyStore'

export default function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)
  const { isMobileOptions } = useSelector(store => store.switch)
  const loader = useSelector(store => store.switch.loader)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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

  if (loader) return <Loader />

  return connections?.length === 0 ? <EmptyStore text={"Connections"} />
    :
    (
      <div className={`w-full h-screen flex flex-col p-2 items-center gap-3 ${isMobileOptions ? "-z-10" : "z-auto"}`} >
        {connections?.map((connection) => <ConnectionCard key={connection?._id} connection={connection} />)}
      </div>
    )
}
