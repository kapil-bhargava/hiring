import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import EditProfile from "../../components/applicants/EditProfile";
import ResumeUploader from "./ResumeUploader";
import ProfilePicUploader from "./ProfilePicUploader";

/**
 * =================================================
 * PROFILE PAGE
 * =================================================
 * - Fetches candidate profile using userId
 * - Displays profile info
 * - Allows edit profile
 * - Allows resume upload/update
 */
const Profile = () => {
  const navigate = useNavigate();

  // Cookie contains logged-in user object (saved during login)
  const [cookies] = useCookies(["user"]);

  // Toggle edit mode
  const [editProfile, setEditProfile] = useState(false);

  // Candidate profile data from backend
  const [profile, setProfile] = useState(null);

  // Loading state while fetching profile
  const [loading, setLoading] = useState(true);

  // Logged-in user's userId (same as used in Candidate schema)
  const userId = cookies?.user?._id;

  /**
   * =================================================
   * FETCH CANDIDATE PROFILE
   * =================================================
   * - Calls backend GET API
   * - Stores Candidate document in state
   * 
   * 
   */


  const fetchCandidateProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/candidate/profile/${userId}`,
        {
          withCredentials: true, // important (cookies based auth)
        }
      );

      // Backend returns: { success, data }
      setProfile(response.data.data);
    } catch (error) {
      console.error("Profile fetch error:", error.message);

      // Optional redirect logic (if needed later)
      // navigate("/candidate/profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Profile";

    if (userId) {
      fetchCandidateProfile();
    }
  }, [userId, navigate, setEditProfile]);

  /* ================= Loader ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Loading profile...
      </p>
    );
  }

  /* ================= Edit Mode ================= */
  if (editProfile) {
    /**
     * Passing:
     * - setEditProfile → to close edit mode
     * - profile → to prefill form fields
     */
    return (
      <EditProfile
        setEditProfile={setEditProfile}
        profile={profile}
        fetchCandidateProfile={fetchCandidateProfile} // Pass fetch function to refresh profile after update
      />
    );
  }

  /* ================= View Mode ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8">

        {/* ================= Header ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Avatar */}
          {/* <div className="w-20 h-20 rounded-full bg-purple-600 text-white 
            flex items-center justify-center text-3xl font-bold">
            {profile?.name?.slice(0, 2).toUpperCase()}
          </div> */}
          <ProfilePicUploader
            profile={profile}
            userId={userId}
            fetchCandidateProfile={fetchCandidateProfile} // To refresh profile after pic update
            onProfilePicUpdate={(updatedProfile) => setProfile(updatedProfile)} // Update profile state after pic upload
          />


          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              {profile?.name}
            </h1>
            <p className="text-gray-500">
              Candidate
            </p>
          </div>

          <button
            onClick={() => setEditProfile(true)}
            className="flex items-center gap-2 px-4 py-2 
            rounded-lg bg-purple-600 text-white text-sm font-semibold 
            hover:bg-purple-700 transition"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <Divider />

        {/* ================= Personal Info ================= */}
        <Section title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Info icon={<FaEnvelope />} label="Email" value={profile?.email} />
          <Info icon={<FaPhoneAlt />} label="Phone" value={profile?.phone} />
          <Info icon={<FaMapMarkerAlt />} label="Location" value={profile?.location} />
        </div>

        <Divider />

        {/* ================= Education ================= */}
        <Section title="Education" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Info icon={<FaGraduationCap />} label="Degree" value={profile?.education?.degree} />
          <Info icon={<FaGraduationCap />} label="University" value={profile?.education?.university} />
          <Info icon={<FaGraduationCap />} label="Duration" value={profile?.education?.duration} />
        </div>

        <Divider />

        {/* ================= Experience ================= */}
        <Section title="Experience" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Info icon={<FaBriefcase />} label="Role" value={profile?.experience?.role} />
          <Info icon={<FaBriefcase />} label="Company" value={profile?.experience?.company} />
          <Info icon={<FaBriefcase />} label="Duration" value={profile?.experience?.duration} />
        </div>

        <Divider />

        {/* ================= Skills ================= */}
        <Section title="Professional Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Info
            icon={<FaUser />}
            label="Skills"
            value={profile?.skills?.join(", ")}
          />
        </div>

        <Divider />

        {/* ================= Links + Resume ================= */}
        <Section title="Profile Links" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile?.github && (
            <LinkCard icon={<FaGithub />} label="GitHub" link={profile.github} />
          )}

          {profile?.linkedin && (
            <LinkCard icon={<FaLinkedin />} label="LinkedIn" link={profile.linkedin} />
          )}

          {/* Resume Upload / Update */}
          <ResumeUploader
            userId={userId}
            profile={profile}
            onSuccess={(updatedProfile) => setProfile(updatedProfile)}
          />
        </div>
      </div>
    </div>
  );
};

/* ================= Reusable UI Components ================= */

const Section = ({ title }) => (
  <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
);

const Info = ({ icon, label, value }) => (
  <div className="flex gap-3 bg-slate-50 rounded-xl p-4">
    <div className="text-purple-600 text-lg">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">
        {value || "—"}
      </p>
    </div>
  </div>
);

const LinkCard = ({ icon, label, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 
    hover:bg-purple-50 transition"
  >
    <div className="text-purple-600 text-xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-purple-700 truncate">
        {link}
      </p>
    </div>
  </a>
);

const Divider = () => <div className="border-t border-gray-200" />;

export default Profile;
