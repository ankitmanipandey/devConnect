import { useDispatch, useSelector } from "react-redux"
import "/src/chatscroller/style.css"
import ChatList from "./ChatList"
import ChatWindow from './ChatWindow'
import { addConnections } from "../../config/Slices/connectionSlice"
import { setLoader } from "../../config/Slices/switchSlice"
import { toast } from "react-toastify"
import { useEffect } from "react"
import axios from "axios"
import Loader from "../Utilities/Loader"

export default function Messages() {
  const user = useSelector(store => store.user)
  const { loader } = useSelector(store => store?.switch)
  const connections = useSelector(store => store?.connection)
  const { isProfileNav } = useSelector(store => store?.switch)
  const { isMobileOptions } = useSelector(store => store?.switch)
  const dispatch = useDispatch()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const fetchConnections = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.get(`${BACKEND_URL}/user/connections`, { withCredentials: true });
      dispatch(addConnections(res?.data?.finalData));
      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      toast?.error("Could not get connections ")
    }
  };

  useEffect(() => {
    fetchConnections()
  }, [])

  return loader ? <Loader /> : (
    <div className={`h-full flex overflow-hidden w-full ${(isProfileNav || isMobileOptions) ? "-z-10" : "z-auto"}`}>
      <div className='md:block hidden h-full w-[25%] border-r border-white cursor-pointer p-1 bg-[#081526] overflow-y-auto scrollbar-hidden bg-gradient-to-r from-[#00092d] opacity-80'>
        {connections?.map((connection) => {
          return <ChatList key={connection?._id} userId={connection?._id}
            photoUrl={connection?.photoUrl}
            name={connection?.name} />
        })}
      </div>

      <div className='h-full md:w-[75%] w-full border-r-1 overflow-auto  '>
        <ChatWindow user={user} connection={connections} />
      </div>
    </div >
  )
}


