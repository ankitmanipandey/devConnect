import { useDispatch, useSelector } from "react-redux"
import UniversalButton from "./UniversalButton"
import { setIsEmailVerified, setLoader, toggleSignUp } from "../config/switchSlice"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { addUser } from "../config/userSlice"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { BACKEND_URL, CLOUDINARY_URL, DEFAULT_PHOTOURL } from "../hardcoded/constants"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSignup } = useSelector(store => store.switch)
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [skills, setSkills] = useState("")
  const [photoUrl, setPhotoUrl] = useState(DEFAULT_PHOTOURL)
  const [about, setAbout] = useState("")
  const loader = useSelector(store => store.switch.loader)

  const handlePhotoUpload = async (event) => {
    dispatch(setLoader(true))
    const file = event.target.files[0]
    if (!file) return
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "photoURL")
    data.append("cloud_name", "daiiyb5u4")
    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: data
      })
      const photoPath = await res.json()
      setPhotoUrl(photoPath?.url)
      toast.success("Save to Upload the photo")
    }
    catch (err) {
      toast.error("Error in Uploading the data")
    }
    finally {
      dispatch(setLoader(false))
    }
  }

  const handleLogin = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.post(`${BACKEND_URL}/login`, {
        emailId, password
      }, { withCredentials: true })

      if (res.status === 200) {
        navigate("/feed")
        dispatch(addUser(res.data))
        toast.success("Logged In Successfully")
        dispatch(setLoader(false))
      }

    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error(err?.response?.data)
    }
  }

  const handleSignUp = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.post(`${BACKEND_URL}/signup`, {
        name, emailId, password, skills, ...(photoUrl && { photoUrl }), about
      }, { withCredentials: true })
      if (res.status === 200) {
        navigate("/feed")
        dispatch(addUser(res.data))
        dispatch(setLoader(false))
        toast.success("Signed Up Successfully")
      }
    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error(err?.response?.data);

    }
  }


  return loader ? <Loader /> : (
    <div className="w-full min-h-screen fixed flex flex-col justify-center items-center">

      <div className=" md:bg-[#00092d] rounded-lg w-full md:w-[60%] h-[50%] md:h-[85%] opacity-90 rounded-l-lg flex outline-none">

        <div className="hidden md:w-[40%] md:h-full md:flex flex-col gap-15">

          <div className="h-12 px-2 flex items-center">
            <div className="rounded-full flex gap-1 items-center">
              <img src="/logo.png" alt="" className="object-cover rounded-full cursor-pointe h-8 w-8r" title="Home" />
              <div className="text-[#FEFFFE] text-l md:text-2xl " title="devConnect">
                devconnect
              </div>
            </div>
          </div>

          <div className="min-h-56 px-2 flex justify-center items-center ">

            <div className="flex flex-col gap-3 justify-center">
              <p className="text-center text-white text-2xl md:text-4xl">Welcome Back!</p>
              <p className="text-center text-white mt-2 text-sm md:text-xl">To keep connected with us please login with your personal info</p>
              <div className={"text-white text-center flex justify-center p-3 mb-1.5"}>
                <UniversalButton text={`${isSignup ? "Login" : "Sign Up"}`} handleFunction={() => { dispatch(toggleSignUp(!isSignup)); setEmailId(""); setPassword(""); setName(""); setPhotoUrl(""); setSkills([]) }} />
              </div>
            </div>

          </div>

        </div>

        <div className={`w-full m-2 md:w-[60%] ${isSignup ? "h-full" : "min-h-full"} bg-[#FEFFFE] rounded-lg md:rounded-r-lg opacity-65 text-[#00092d] flex flex-col gap-2 py-3 justify-center outline-none`}>

          <div className="md:hidden h-12 px-2 flex items-center">
            <div className="rounded-full flex gap-2 items-center">
              <img src="/logo.png" alt="" className="object-cover rounded-full cursor-pointe h-10 w-10" title="Home" />
              <div className="text-[#00092d] text-l text-3xl " title="devConnect">
                devconnect
              </div>
            </div>
          </div>

          <p className=" text-2xl md:text-3xl text-center pt-11 md:pt-0">{`${isSignup ? "Create an Account" : "Login"}`}</p>
          <p className="text-l text-center ">"Connect with Coders,Build with friends." </p>

          <form className="flex flex-col w-full h-[60%] gap-3 items-center just " onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col w-[60%] gap-4">
              {isSignup && <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="name" placeholder="Name"
                  value={name}
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={(e) => setName(e.target.value)}>
                </input>
              </div>}
              <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  name="email" placeholder="Email id"
                  autoComplete="true"
                  value={emailId}
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={(e) => setEmailId(e.target.value)}>
                </input>
              </div>
              <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password" placeholder="Password"
                  autoComplete="true"
                  value={password}
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
              </div>
              {isSignup && <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-wrench"></i>
                <input
                  type="text"
                  name="skills" placeholder="Skills"
                  autoCapitalize="true"
                  value={skills}
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={(e) => setSkills(e.target.value)}>
                </input>
              </div>}
              {isSignup && <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-circle-info"></i>
                <input
                  type="text"
                  name="about" placeholder="About"
                  autoCapitalize="true"
                  value={about}
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={(e) => setAbout(e.target.value)}>
                </input>
              </div>}
              {isSignup && <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center">
                <i className="fa-solid fa-camera"></i>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="p-2 w-full rounded-md outline-none text-white"
                  onChange={handlePhotoUpload}>
                </input>
              </div>}
            </div>

            <div className="flex items-center justify-center md:w-full">
              <button type="button" className="text-white px-4 py-2 rounded-lg w-full mt-6 md:w-1/2 bg-[#051f89] hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
                onClick={isSignup ? handleSignUp : handleLogin}
              >
                {`${isSignup ? "Sign up" : "Login"}`}
              </button>
            </div>
            {!isSignup && <div onClick={() => dispatch(setIsEmailVerified(false))}>
              <Link to={"/forgot/password"}>
                <p className="underline font-semibold hover:text-blue-900">Forgot Password?</p>
              </Link>
            </div>}
            <div className="md:hidden mb-2">
              <p>{!isSignup ? "Not Registered yet!" : "Already a user!"} <span className="underline underline-offset-1 font-bold" onClick={() => dispatch(toggleSignUp(!isSignup))}>{!isSignup ? "Sign Up here" : "Login here"}</span></p>
            </div>
          </form>

        </div>

      </div >

    </div >
  )
}

export default Login
