import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EmptyChat() {
    const navigate = useNavigate()
    const connections = useSelector(store => store.connection)
    return (
        <div className="flex flex-col justify-center items-center h-full text-white">
            <img
                src='logo.png'
                alt="devConnect_Logo"
                className="w-24 h-24 opacity-60 rounded-full"
            />
            <h2 className="text-2xl font-semibold mt-4">Welcome to devConnect</h2>
            <p className="text-sm text-gray-400 mt-2 text-center w-[60%]">
                {connections.length === 0 ? "You don't any Connection go to Feed for making devFriends" :
                    "Select a conversation to start messaging in connections."}
            </p>
            <div className="text-sm text-white mt-4 text-center w-[60%]">
                <button className="bg-green-600 py-2 px-4 rounded-lg transtion-all duration-150 ease-in-out hover:scale-105 cursor-pointer text-lg"
                    onClick={() => { connections.length === 0 ? navigate("/feed") : navigate("/connections") }}>{connections.length === 0 ? "Feed" : "Connections"}</button>
            </div>
        </div>
    );
}