import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../config/userSlice"
import { setIsEmailVerified } from '../config/switchSlice'
import { BACKGROUND_IMAGE, BACKEND_URL } from "../hardcoded/constants"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/profile/view`,
                { withCredentials: true })
            dispatch(addUser(res.data))
        }
        catch (err) {
            const params = new URLSearchParams(location.search)
            const token = params.get("token")
            const cookie = params.get("cookie")
            if (err?.response?.status === 401 && location.pathname === "/forgot/password") {
                if (token) {
                    navigate(`/forgot/password?token=${token}`)
                    dispatch(setIsEmailVerified(true))
                }
                else {
                    navigate("/forgot/password")
                }
            }
            else if (cookie && location.pathname === '/premium') {
                navigate("/premium")
            }
            else {
                navigate("/")
            }
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className="h-screen flex  w-screen flex-col">
            <img src={BACKGROUND_IMAGE} alt="bg-image" className="fixed -z-10 object-cover w-screen h-screen" />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Body
