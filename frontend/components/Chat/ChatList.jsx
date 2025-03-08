import { useDispatch, useSelector } from "react-redux";
import { setTargetPhotoUrl, setTargetUserId, setTargetUserName } from "../../config/Slices/chatSlice";

export default function ChatList({ photoUrl, name, userId }) {
    const dispatch = useDispatch()
    const { targetUserId } = useSelector(store => store.chat)
    return (
        <div className={`hidden h-16 md:flex items-center transition-all duration-100 ease-in-out rounded-lg p-1 mb-1 ${targetUserId === userId ? "bg-[#4a5078] " : "hover:bg-[#292d49]"}`}
            onClick={() => {
                dispatch(setTargetUserId(userId));
                dispatch(setTargetPhotoUrl(photoUrl));
                dispatch(setTargetUserName(name));
            }}>
            <div className=''>
                <img src={photoUrl} alt="img" className='size-13 p-1 rounded-full' />
            </div>
            <p className='text-white p-3 ml-2 w-[80%] overflow-x-hidden font-semibold'>{name}</p>
        </div>
    )
}
