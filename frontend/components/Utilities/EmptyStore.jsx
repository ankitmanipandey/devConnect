import { WifiOff } from "lucide-react";

const EmptyStore = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="p-6 bg-gray-100 rounded-full shadow-md animate-pulse">
                <WifiOff className="w-12 h-12 text-gray" />
            </div>
            <p className="mt-4 text-lg font-semibold text-[#FEFFFE]">No {text} Available</p>
            <p className="text-sm text-[#FEFFFE]">Try refreshing or check your network settings.</p>
        </div>
    );
};

export default EmptyStore;

