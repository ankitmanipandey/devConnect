import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../config/Slices/userSlice";
import axios from "axios";
import { setLoader, toggleProfileEdit } from "../../config/Slices/switchSlice";
import Loader from "../Utilities/Loader";
import { toast } from "react-toastify"

export default function MobileOptions() {
    const dispatch = useDispatch()
    const { loader } = useSelector(store => store?.switch)
    const { isMobileOptions } = useSelector(store => store?.switch)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const handleSignOut = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/logout`, {}, { withCredentials: true })
            dispatch(removeUser())
            dispatch(setLoader(false))
            toast.success("Signed Out Successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Error in Signing out !!")
        }
    }
    return loader ? <Loader /> : (
        <div className={`fixed h-67 w-32 p-2 z-50 rounded-l text-[#FEFFFE] right-0 top-14 bg-[#00032d] transition-all duration-200 ease-in-out ${isMobileOptions ? "translate-x-0" : "translate-x-full"} `}>
            <Link to={"/feed"}><li className="list-none mb-1 r border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black">Feed</li></Link>
            <Link to={"/requests"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Requests</li></Link>
            <Link to={"/connections"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Connections</li></Link>
            <Link to={"/premium"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Premium</li></Link>
            <Link to={"/chat"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Chat</li></Link>
            <Link to={"/profile"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black " onClick={() => dispatch(toggleProfileEdit(true))}>Profile</li></Link>
            <Link to={"/login"}><li className="list-none mb-1 cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black " onClick={handleSignOut}>SignOut</li></Link>
        </div>
    )
}
