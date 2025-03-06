import { useDispatch } from "react-redux";
import { setTargetUserId } from "../config/chatSlice";
import { useNavigate } from "react-router-dom";
const ConnectionDetailCard = ({ connection, setIsDetailCard }) => {
    const dispatch = useDispatch()
    const navigate =useNavigate()
    return (
        <div className=' absolute z-10 md:top-20 top-[20%] left-[12] md:left-[35%] h-[400px] w-[270px] m-3 md:w-[300px] bg-[#00214d] text-[#fefffe] rounded-xl shadow-xl'>
            <div className='flex justify-end p-3 cursor-pointer ' onClick={() => setIsDetailCard(false)} >
                <i className="fa-solid fa-xmark text-3xl  "></i>
            </div>

            <div className='h-[30%] w-full flex flex-col gap-2 justify-center items-center' >
                <img src={connection?.photoUrl} alt="/url" className='object-cover size-36 rounded-full'  ></img>
                {connection?.isPremium && <i className="fa-regular fa-circle-check relative top-1 text-xl text-[#FEFFFE]"></i>}
            </div>
            <div className='h-[50%] flex flex-col justify-center items-center' >
                <h2 className='text-xl font-semibold'>{connection.name}</h2>
                <h2>{connection?.emailId}</h2>
                <h2>{connection?.about}</h2>
                <h2>{connection?.skills}</h2>
                <button className="bg-green-600 px-3 py-2 mt-4 rounded-xl cursor-pointer transition-all duration-150 ease-in-out hover:scale-105" onClick={() => { dispatch(setTargetUserId(connection._id)); navigate("/chat") }}>Chat</button>
            </div>
            <div>
            </div>


        </div >
    )
}

export default ConnectionDetailCard;

