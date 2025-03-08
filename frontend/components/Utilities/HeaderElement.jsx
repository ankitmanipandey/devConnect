import Lottie from "lottie-react"
import manwithcomputer from "../../animations/manwithcomputer.json"
import { useNavigate } from "react-router-dom"
import UniversalButton from "./UniversalButton"
import { useSelector } from "react-redux"
export default function HeaderElement() {
    const navigate = useNavigate()
    const user = useSelector(store => store?.user)
    return (
        <div className='h-screen w-full fixed flex justify-center items-center px-4'>
            <div className=' bg-[#00092d] opacity-90 w-full max-w-3xl md:w-3/5 rounded-lg p-5 flex flex-col items-center  md:-top-6'>
                <div className="flex items-center gap-2 justify-center">
                    <img src="/logo.png" alt="" className="object-cover rounded-full cursor-pointe h-9 w-9 hidden md:flex" title="Home" />
                    <p className="text-3xl font-bold p-2 text-[#FEFFFE] text-center">Welcome to devConnect</p>
                </div>
                <div className='flex items-center justify-center'>
                    <Lottie animationData={manwithcomputer} loop={true} className="w-48 h-48 md:w-64 md:h-64" />
                </div>

                <div className="text-white text-center md:mt-4">

                    <p className="text-2xl font-medium">"Alone We Code, Together We Build!"</p>
                    <p className="text-xl font-medium p-2 mt-2">Join a community where friendships start with a single line of code.</p>
                    <UniversalButton text={"Get Started"} handleFunction={() => { !user ? navigate("/login") : navigate("/feed") }} />
                </div>
            </div>

        </div>
    )
}
