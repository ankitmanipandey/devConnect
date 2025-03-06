import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleProfileEdit } from '../config/switchSlice'
import { CLOUDINARY_URL } from '../hardcoded/constants'

export default function ProfileEditCard(props) {
    const { name, setName, about, setAbout, skills, setSkills, password, setPassword, setPhotoUrl, setIsUploading, isUploading, handleProfileEdit } = props
    const loader = useSelector(store => store.switch.loader)
    const dispatch = useDispatch()
    const user = useSelector(store => store?.user)
    const { isProfileEdit } = useSelector(store => store?.switch)
    const handlePhotoUpload = async (event) => {
        setIsUploading(true)
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
        }
        catch (err) {
            toast.error("Error in Image Upload")
        }
        finally {
            setIsUploading(false)
        }
    }
    return (
        <div className='bg-[#00092d] opacity-90 h-108 w-72 mt-5 md:mt-1 m-2 md:w-92  md:h-108 flex flex-col rounded-lg items-center gap-4 justify-center'>

            <h2 className='text-[#FEFFFE] font-semibold text-2xl hidden md:block'>Edit Your Profile Here</h2>
            {user?.isPremium && <i className="fa-regular fa-circle-check text-xl text-[#FEFFFE]"></i>}
            <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center w-[70%]">
                <i className="fa-solid fa-user"></i>
                <input
                    type="text"
                    name="name" placeholder="Name"
                    value={name}
                    className="p-2 w-full rounded-md outline-none text-white"
                    onChange={(e) => setName(e.target.value)}>
                </input>
            </div>
            <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center w-[70%]">
                <i className="fa-solid fa-circle-info"></i>
                <input
                    type="text"
                    name="about" placeholder="About"
                    value={about}
                    className="p-2 w-full rounded-md outline-none text-white"
                    onChange={(e) => setAbout(e.target.value)}>
                </input>
            </div>
            <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center w-[70%]">
                <i className="fa-solid fa-wrench"></i>
                <input
                    type="text"
                    name="skills" placeholder="Skills"
                    value={skills.join(",")}
                    className="p-2 w-full rounded-md outline-none text-white"
                    onChange={(e) => setSkills(e.target.value.split(","))}>
                </input>
            </div>
            <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center w-[70%]">
                <i className="fa-solid fa-lock"></i>
                <input
                    type="text"
                    name="password" placeholder="Password"
                    value={password}
                    className="p-2 w-full rounded-md outline-none text-white"
                    onChange={(e) => setPassword(e.target.value)}>
                </input>

            </div>
            <div className="flex items-center border-1 gap-1 px-1 bg-gray-700 rounded-lg justify-center w-[70%]">
                <i className="fa-solid fa-camera"></i>
                <input
                    type="file"
                    name="photourl" placeholder="Photo"
                    accept='image/*'
                    className="p-2 w-full rounded-md outline-none text-white"
                    onChange={handlePhotoUpload}>
                </input>
            </div>
            <div className='flex justify-center md:hidden'>
                <button disabled={isUploading ? true : false} className={`text-lg ${isUploading ? "bg-gray-600" : "bg-pink-500"} py-2 px-6 text-[#FEFFFE] rounded-xl m-3 font-semibold cursor-pointer`}
                    onClick={isProfileEdit ? () => { handleProfileEdit() }
                        : () => { dispatch(toggleProfileEdit(!isProfileEdit)) }}>{isProfileEdit ? "Save" : "Edit"}</button>
            </div>

        </div>
    )
}
