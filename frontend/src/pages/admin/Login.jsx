import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [cookie,createcookie ,] = useCookies()

    const handleSubmit = (e) => {
        e.preventDefault();
        // login API call here
        if (userId == "Admin" && password == "123") {

            createcookie("admin", userId)
            navigate("/admin/dashboard")
        } else{
            alert("user not found")
    }
};

useEffect(()=>{
    document.title = "Admin Login"
  })

return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">

            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
                Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* User ID */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        User ID
                    </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        placeholder="Enter User ID"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter Password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
);
}
