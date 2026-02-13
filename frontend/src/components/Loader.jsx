
const Loader = ({message}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-800 font-medium">{message}</p>
            </div>
        </div>
    )
}

export default Loader