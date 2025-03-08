import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLoader } from "../../config/Slices/switchSlice"
import Loader from "../Utilities/Loader"

export default function ForgotPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { isEmailVerified } = useSelector(store => store.switch)
    const loader = useSelector(store => store.switch.loader)
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const handleVerifyBtn = async () => {
        try {
            dispatch(setLoader(true))
            const res = await axios.post(`${BACKEND_URL}/verify/user`, {
                emailId
            }, { withCredentials: true })
            dispatch(setLoader(false))
            toast.success(res?.data?.message)
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error(err?.response?.data?.message)
        }
    }

    const handleResetBtn = async () => {
        try {
            dispatch(setLoader(true))
            const params = new URLSearchParams(location.search)
            const token = params.get("token")
            const res = await axios.post(`${BACKEND_URL}/reset/password?token=${token}`, {
                password
            }, { withCredentials: true })
            
            if (res?.data?.success === true) {
                dispatch(setLoader(false))
                navigate("/login")
            }

            toast.success("Password Changed Successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error(err?.response?.data?.message)
        }

    }


    return loader ? <Loader /> : (
        <div className="w-full min-h-screen fixed flex flex-col justify-center items-center">
            <div className="w-full m-2 md:w-[60%] h-full bg-[#FEFFFE] rounded-lg md:rounded-r-lg opacity-65 text-[#00092d] flex flex-col gap-2 py-3  justify-center outline-none">

                <p className="text-2xl md:text-3xl text-center pt-11 md:pt-0 flex justify-center items-center" >{!isEmailVerified ? "Verify Your Email" : "Reset Your Password"}</p>

                <form className="flex flex-col w-full h-[60%] gap-3 items-center justify-center just p-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col w-[60%] gap-4">
                        <div className={`flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center ${isEmailVerified ? "hidden" : "flex"}`}>
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                type="text"
                                name="email" placeholder="Email id"
                                autoComplete="off"
                                value={emailId}
                                className="p-2 w-full rounded-md outline-none text-white"
                                onChange={(e) => setEmailId(e.target.value)}>
                            </input>
                        </div>
                        <div className={`flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center ${!isEmailVerified ? "hidden" : "flex"}`}>
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="text"
                                name="password" placeholder="Password"
                                autoComplete="off"
                                value={password}
                                className="p-2 w-full rounded-md outline-none text-white "
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-[50%]">
                        <div className="w-full flex justify-center gap-2 mx-1">
                            <button type="button"
                                className="bg-[#051f89] text-white  px-4 py-2  rounded-lg  mt-6 md:w-1/2 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
                                onClick={() => (!isEmailVerified ? handleVerifyBtn() : handleResetBtn())}
                            >
                                {isEmailVerified ? "Reset" : "Verify"}
                            </button>
                        </div>
                        <div className={`w-full ${!isEmailVerified ? "flex" : "hidden"}`}>
                            <button type="button"
                                className="bg-[#051f89] text-white  px-4 py-2 rounded-lg mt-6 md:w-1/2 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
                                onClick={() => (navigate(-1))}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </form>

            </div >
        </div >
    )
}
