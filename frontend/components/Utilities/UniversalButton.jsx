
export default function UniversalButton({ text, handleFunction }) {
    const handleOnClick = () => {
        handleFunction()
    }
    return (
        <button className="bg-[#051f89] text-white  px-4 py-2 rounded-lg w-full mt-6 md:w-1/2 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer" onClick={handleOnClick}>{text}</button>
    )
}
