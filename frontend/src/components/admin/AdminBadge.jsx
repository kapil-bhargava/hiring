import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import avtar from "../../assets/int.png";
import adminavtar from "../../assets/adminavtart.jpg";
import { confirmLogout } from "../../utils/confirmDialogue"
import { FaSignOutAlt, FaTachometerAlt, FaUser } from "react-icons/fa";

export default function AdminBadge() {
    const [cookie, , removeCookie] = useCookies()
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);
    const navigate = useNavigate()

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    // const logout = () => {
    //     removeCookie("admin")
    //     navigate("/admin/login")

    // }

    // logout confirmatiuon
    const handleLogout = async () => {
        const ok = await confirmLogout();
        if (ok) {
            removeCookie("admin")
            navigate("/admin/login")
        }
    };


    useEffect(() => {
        console.log(cookie.admin)
    }, [])


    const API = import.meta.env.VITE_APP_API;


    const [cookies] = useCookies(["user"]);
    const userId = cookies?.user?._id;

    const [candidateProfile, setCandidateProfile] = useState([]);
    // const fetchAdminProfile = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${import.meta.env.VITE_APP_API}/api/candidate/profile/${userId}`,
    //             {
    //                 withCredentials: true, // important (cookies based auth)
    //             }
    //         );
    //         console.log("candiate badge", response.data)
    //         // Backend returns: { success, data }
    //         setCandidateProfile(response.data.data);
    //     } catch (error) {
    //         console.error("Profile fetch error:", error.message);

    //         // Optional redirect logic (if needed later)
    //         // navigate("/admin/profile");
    //     } finally {
    //         //   setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchAdminProfile();
    //     document.title = "Candidate Badge"
    // }, [])

    return (
        <div className="relative" ref={panelRef}>
            {/* Profile Avatar */}
            {/* <img src={import.meta.env.VITE_APP_API + candidateProfile?.profilePic?.fileUrl || avtar} alt={candidateProfile?.userId?.name || "Profile"} className="w-10 h-10 rounded-full cursor-pointer border hover:ring-2 hover:ring-blue-500 transition"
                onClick={() => setOpen(!open)}
            /> */}
            {/* <img className="w-10 h-10 rounded-full cursor-pointer border hover:ring-2 hover:ring-blue-500 transition" src={avtar} alt="" /> */}
            <img
                // src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                src={adminavtar}
                alt="Profile"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer border hover:ring-2 hover:ring-blue-500 transition"
            />

            {/* Gmail-style panel */}
            {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border z-50 bg-amber-200">
                    {/* User Info */}
                    <div className="p-4 border-b text-center">
                        {/* <img
                            src={import.meta.env.VITE_APP_API + candidateProfile?.profilePic?.fileUrl || avtar}
                            className="w-16 h-16 mx-auto rounded-full mb-2"
                            alt="user"
                        /> */}
                        <img
                            // src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                            src={adminavtar}
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer  mx-auto border hover:ring-2 hover:ring-blue-500 transition"
                        />
                        <h4 className="font-semibold">{cookie.admin}</h4>
                        <p className="text-sm text-gray-500">{cookie.admin.toLowerCase() + "@gmail.com"}</p>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                        <Link
                            to="/admin/profile"
                            className="flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                           <FaUser /> Profile
                        </Link>

                        <Link
                            to="/admin/dashboard"
                            className="flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                           <FaTachometerAlt />  Dashboard
                        </Link>

                        <button
                            onClick={() => {
                                setOpen(false);
                                handleLogout()
                            }}
                            className=" flex  items-center gap-2 w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                        >
                         <FaSignOutAlt />    Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
