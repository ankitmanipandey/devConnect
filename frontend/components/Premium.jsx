import React from 'react'
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js'
import { BACKEND_URL } from '../hardcoded/constants'
import { useSelector } from 'react-redux';
export default function PaymentUI() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const user = useSelector(store => store?.user)
    const { isMobileOptions } = useSelector(store => store.switch)
    const handleBuyBtn = async (type) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/create-checkout-session/${type}`,
                {},
                { withCredentials: true });
            const stripe = await stripePromise;
            stripe.redirectToCheckout({ sessionId: res?.data?.id });
        } catch (error) {
            console.error("Payment Error:", error);
        }
    }
    return user?.isPremium
        ? <div className='text-center m-2 text-5xl text-[#FEFFFE]'>{`You are already our ${user?.membershipType} Member`}</div>
        : (
            <div className={`flex justify-center items-center md:top-20 md:relative ${isMobileOptions ? "-z-10" : "z-auto"}`}>
                <div className='flex flex-col md:flex-row gap-2 md:gap-10 py-2 items-center justify-center'>
                    <div className='w-70 h-68 md:h-82 md:w-88  my-2 bg-[#00092d] opacity-90 flex flex-col justify-center p-5 gap-5 items-center rounded-xl transition-all duration-200 hover:scale-105'>
                        <h2 className='text-2xl md:text-3xl text-center text-[#FEFFFE] p-3'>Silver Membership</h2>
                        <div className='p-3'>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Rs 500-/</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Get a Verification Badge</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- For 6 Months</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Send Upto 100 Requests/day</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Chat Upto 30 min daily</li>
                        </div>
                        <button className='py-2 px-3 bg-blue-500 text-white rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-700' onClick={() => handleBuyBtn("silver")}>Buy Silver</button>
                    </div>
                    <div className='w-70 h-68 md:h-82 top-10 md:w-88 bg-[#00092d] opacity-90 flex flex-col justify-center p-5 gap-5 items-center rounded-xl transition-all duration-200 hover:scale-105'>
                        <h2 className='text-2xl md:text-3xl text-center text-[#FEFFFE] p-3'>Gold Membership</h2>
                        <div className='p-3'>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Rs 1000-/</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- Get a Verification Badge</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- For Lifetime</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- No limit on Requests/day</li>
                            <li className='list-none text-[#FEFFFE] text-sm md:text-lg'>- No Limit on Chat Time</li>
                        </div>
                        <button className='py-2 px-3 bg-pink-500 text-white rounded-xl cursor-pointer transition-all duration-200 hover:bg-pink-700' onClick={() => handleBuyBtn("gold")}>Buy Gold</button>
                    </div>
                </div>
            </div>
        )
}
