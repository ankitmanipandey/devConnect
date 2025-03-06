import React from 'react'
import { Bars } from 'react-loader-spinner'
import Lottie from 'lottie-react'
import loaderAnimation from '../animations/loaderAnimation'
export default function Loader() {
    return (
        <div className='flex justify-center items-center h-screen fixed w-full bg-transparent'>
            <Bars
                height="80"
                width="80"
                color="#FEFFFE"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            {/* <Lottie animationData={loaderAnimation} loop={true} className="w-32 h-32 md:w-52 md:h-32" /> */}
        </div>
    )
}
