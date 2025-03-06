import { useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import MobileOptions from "./MobileOptions"
import { setLoader, toggleMobileOptions, toggleProfileNav } from "../config/switchSlice"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../config/userSlice"
import axios from "axios"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { BACKEND_URL } from "../hardcoded/constants"

const Navbar = () => {
    const loader = useSelector(store => store?.switch?.loader)
    const location = useLocation()
    const dispatch = useDispatch()
    const profileRef = useRef()
    const mobileRef = useRef()
    const { isProfileNav } = useSelector(store => store?.switch)
    const { isMobileOptions } = useSelector(store => store?.switch)
    const user = useSelector(store => store?.user)
    const navigate = useNavigate()
    const handleSignOut = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/logout`, {}, {
                withCredentials: true
            })
            dispatch(removeUser())
            navigate("/login")
            dispatch(setLoader(false))
            toast.success("Signed Out Successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Error In Sign Up")
        }
    }
    const handleBarClick = () => {
        dispatch(toggleMobileOptions(!isMobileOptions))
    }
    const handleProfileClick = () => {
        dispatch(toggleProfileNav(!isProfileNav))
    }
    useEffect(() => {
        const handleMobileOutsideClick = (event) => {
            if (mobileRef?.current && !mobileRef?.current?.contains(event?.target)) {
                dispatch(toggleMobileOptions(false))
            }
        }
        if (mobileRef) {
            addEventListener("mousedown", handleMobileOutsideClick)
        }
        return (() => {
            removeEventListener("mousedown", handleMobileOutsideClick)
        })
    }, [isMobileOptions])

    useEffect(() => {
        const handelOutSideClick = (event) => {
            if (profileRef?.current && !profileRef?.current?.contains(event.target)) {
                dispatch(toggleProfileNav(false))
            }
        }
        if (isProfileNav) {
            document.addEventListener("mousedown", handelOutSideClick)
        }

        return (() => {
            document.removeEventListener("mousedown", handelOutSideClick)
        })
    }, [isProfileNav])
    return loader ? <Loader /> : (
        <>
            {(location?.pathname !== ("/") && location?.pathname.toString() != ("/login") && user) && <div className="h-14 bg-[#00092d] opacity-95 relative px-4 md:px-8 flex items-center justify-between">
                <div className="h-12 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full">
                        <button onClick={() => { navigate("/") }}><img src="/logo.png" alt="" className="object-cover rounded-full cursor-pointer" title="Home" /></button>
                    </div>
                    <div className="text-[#FEFFFE] text-2xl" title="devConnect">
                        devconnect
                    </div>
                </div>

                <div className="gap-6 items-center hidden md:flex">
                    <Link to={"/feed"} className={`ml-5 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ${location.pathname === "/feed" ? "bg-white text-black" : ""}`}>Feed</Link>
                    <Link to={"/requests"} className={`ml-5 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ${location.pathname === "/requests" ? "bg-[#FEFFFE] text-black" : ""}`}>Requests</Link>
                    <Link to={"/connections"} className={`ml-5 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ${location.pathname === "/connections" ? "bg-[#FEFFFE] text-black" : ""}`}>Connections</Link>
                    <Link to={"/chat"} className={`ml-5 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ${location.pathname === "/chat" ? "bg-[#FEFFFE] text-black" : ""}`}>Chat</Link>
                </div>

                <div ref={mobileRef} className="md:hidden flex items-center cursor-pointer p-4" onClick={handleBarClick}>
                    <i className="fa-solid fa-bars text-2xl text-white"></i>
                    <MobileOptions />
                </div>
                <div ref={profileRef} className="cursor-pointer hidden md:flex items-center gap-2 text-white" onClick={handleProfileClick}>
                    <p className="">{user?.name}</p>
                    <img src={user?.photoUrl} alt="" className="rounded-full h-10 w-10 object-cover cursor-pointer" />
                    {user.isPremium && <i className="fa-regular fa-circle-check text-xl"></i>}
                    <div className={`bg-[#00032d] top-12 text-white h-29 fixed right-0 p-2 z-20 rounded-bl-sm hidden md:block transition-all duration-200 ease-in-out ${isProfileNav ? "translate-x-0" : "translate-x-full"}`}>
                        <li className={`list-none px-2 mb-1 cursor-pointer p-1 transition-all duration-200 ease-in-out hover:bg-[#FEFFFE] hover:text-[#00092d] rounded-xl ${location.pathname === "/premium" ? "bg-white text-black" : ""}`} onClick={() => navigate("/premium")}>Premium</li>
                        <li className={`list-none px-2 mb-1 cursor-pointer p-1 transition-all duration-200 ease-in-out hover:bg-[#FEFFFE] hover:text-[#00092d] rounded-xl ${location.pathname === "/profile" ? "bg-white text-black" : ""}`} onClick={() => navigate("/profile")}>Profile</li>
                        <li className={`list-none px-2 mb-1 cursor-pointer p-1 transition-all duration-200 ease-in-out hover:bg-[#FEFFFE] hover:text-[#00092d] rounded-xl ${location.pathname === "/login" ? "bg-white text-black" : ""}`} onClick={handleSignOut}>SignOut</li>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default Navbar
