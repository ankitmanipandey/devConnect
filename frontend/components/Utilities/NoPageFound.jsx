import { AlertTriangle } from "lucide-react";

const NoPageFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-600">
            <div className="p-6 bg-gray-100 rounded-full shadow-md">
                <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">404 - Page Not Found</h1>
            <p className="text-sm text-gray-500">The page you are looking for doesn’t exist or has been moved.</p>
        </div>
    );
};

export default NoPageFound;