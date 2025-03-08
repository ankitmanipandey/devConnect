import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileEditCard from './ProfileEditCard'
import axios from 'axios'
import { addUser } from '../../config/Slices/userSlice'
import { setLoader, toggleProfileEdit } from '../../config//Slices/switchSlice'
import Loader from '../Utilities/Loader'
import { toast } from 'react-toastify'

export default function Profile() {
  const loggedInUser = useSelector(store => store.user)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const dispatch = useDispatch()
  const { isMobileOptions } = useSelector(store => store.switch)
  const [name, setName] = useState(loggedInUser?.name)
  const [about, setAbout] = useState(loggedInUser?.about)
  const [skills, setSkills] = useState(loggedInUser?.skills)
  const [password, setPassword] = useState("")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const { loader } = useSelector(store => store?.switch)
  const { isProfileEdit } = useSelector(store => store?.switch)
  const user = useSelector(store => store.user)

  const handleProfileEdit = async () => {

    try {
      dispatch(setLoader(true))
      const user = await axios.patch(`${BACKEND_URL}/profile/edit`, {
        name, about, skills, password, ...(photoUrl && { photoUrl })
      }, { withCredentials: true })
      dispatch(addUser(user?.data?.data))
      dispatch(setLoader(false))
      toast.success("Profile Updated Successfully")
    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error(err.response.data)
    }

  }
  useEffect(() => {
    setName(loggedInUser?.name)
    setAbout(loggedInUser?.about)
    setSkills(loggedInUser?.skills)
  }, [loggedInUser])

  return loader ? <Loader /> : (
    <div className={`flex justify-center items-center ${isMobileOptions ? "-z-10" : "z-auto"}`}>
      <div className='relative top-10'>
        <div className='flex justify-center'>
          <img src={loggedInUser?.photoUrl} alt="" className='size-20 md:hidden rounded-full' />
        </div>
        {isProfileEdit && <ProfileEditCard name={name} setName={setName} about={about} setAbout={setAbout}
          skills={skills} setSkills={setSkills} password={password}
          setPassword={setPassword} setPhotoUrl={setPhotoUrl} handleProfileEdit={handleProfileEdit}
          setIsUploading={setIsUploading} isUploading={isUploading} />}
      </div>

      <div className={`hidden bg-[#00092d] opacity-90 p-2 w-72 m-2 md:w-92 md:flex flex-col rounded-lg justify-center items-center relative top-10`}>
        <div className='h-[50%] flex flex-col items-center justify-center'>
          <img src={loggedInUser?.photoUrl} alt="" className='rounded-full size-32 m-2 object-center' />
          <div className='flex justify-center items-center gap-3'>
            <h2 className='text-[#FEFFFE] font-semibold text-2xl'>{name}</h2>
            {user?.isPremium && <i className="fa-regular fa-circle-check text-xl text-[#FEFFFE]"></i>}
          </div>
        </div>
        <div className=' h-[50%] flex flex-col text-[#FEFFFE]'>
          <div className='flex flex-col gap-1 items-start p-4 flex-wrap '>
            <p className='text-center font-semibold p-2 text-xl'>Email Id : <span className="font-normal text-lg">{loggedInUser?.emailId}</span></p>
            <p className='text-center font-semibold p-2 text-xl'>Skills : <span className="font-normal text-lg">{skills?.join(",")}</span></p>
            <p className='text-center font-semibold p-2 text-xl'>About : <span className="font-normal text-lg">{about}</span></p>
          </div >
        </div >
        <div className='flex justify-center '>
          <button disabled={isUploading ? true : false} className={`text-lg ${isUploading ? "bg-gray-600" : "bg-pink-500"} py-2 px-6 text-[#FEFFFE] rounded-xl m-3 font-semibold cursor-pointer`} onClick={isProfileEdit ? () => { handleProfileEdit(); dispatch(toggleProfileEdit(false)) } : () => { dispatch(toggleProfileEdit((!isProfileEdit))) }}>{isProfileEdit ? "Save" : "Edit"}</button>
        </div>
      </div >
    </div>
  )
}
