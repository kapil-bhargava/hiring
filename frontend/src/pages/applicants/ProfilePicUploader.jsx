import { useRef, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { showToast } from "../../components/toast";

const ProfilePicUploader = ({ profile, userId, fetchCandidateProfile, onProfilePicUpdate }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    // Open file picker
    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    // Handle file select
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            setUploading(true);

            const res = await axios.patch(
                `${import.meta.env.VITE_APP_API}/api/candidate/profile-pic/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // calling the API to upload profile pic and update candidate document in backend
            if (res.data.success) {
                // Option 1: Refetch entire profile (simpler, but more API calls)
                // fetchCandidateProfile();
                // Option 2: Update profile state manually (more efficient, but requires careful handling)
                onProfilePicUpdate(res.data.data);
            }
            showToast(res.data.message)
            setTimeout(()=>{
                window.location.reload()
            },[400])
            
            console.log("✅ Profile pic upload response:", res.data);
        } catch (error) {
            console.error("❌ Profile pic upload failed:", error.response?.data || error.message);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        console.log("Profile data in ProfilePicUploader:", profile);
    }, [profile])

    return (
        <div className="relative w-20 h-20">
            {/* Avatar */}
            {profile?.profilePic?.fileUrl ? (
                <img
                    src={`${import.meta.env.VITE_APP_API}${profile.profilePic.fileUrl}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border "
                />
            ) : (
                <div
                    className="w-20 h-20 rounded-full bg-purple-600 text-white 
          flex items-center justify-center text-3xl font-bold"
                >
                    {profile?.name?.slice(0, 2).toUpperCase()}
                </div>
            )}

            {/* Pencil Button */}
            <button
                onClick={handleEditClick}
                disabled={uploading}
                className="absolute bottom-0 right-0 
          bg-white border border-gray-300 
          rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer"
                title="Change profile picture"
            >
                <Pencil size={14} className="text-gray-700" />
            </button>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ProfilePicUploader;
