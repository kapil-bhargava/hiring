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
  FaSave,
} from "react-icons/fa";
import axios from "axios";
import { useCookies } from "react-cookie";
import { showToast } from "../../components/Toast";






const EditProfile = ({ setEditProfile, profile, fetchCandidateProfile }) => {
  const [cookies] = useCookies(["user"]);
  const userId = cookies?.user?._id;

  /* =====================================================
     FORM STATE
     - Empty initially
     - Filled via useEffect from profile or cookie
  ===================================================== */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    education: {
      degree: "",
      university: "",
      startYear: "",
      endYear: "",
    },
    experience: {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
    },
    skills: "",
    github: "",
    linkedin: "",
  });

  /* =====================================================
     PREFILL LOGIC (VERY IMPORTANT)
     Priority:
     1️⃣ Candidate profile (after update)
     2️⃣ Cookie (first-time user)
  ===================================================== */
  useEffect(() => {
    if (profile) {
      // Existing candidate profile → highest priority
      setFormData({
        name: profile.name || "",
        email: profile.email || cookies?.user?.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        education: {
          degree: profile.education?.degree || "",
          university: profile.education?.university || "",
          startYear: profile.education?.startYear || "",
          endYear: profile.education?.endYear || "",
        },
        experience: {
          role: profile.experience?.role || "",
          company: profile.experience?.company || "",
          startDate: profile.experience?.startDate || "",
          endDate: profile.experience?.endDate || "",
        },
        skills: profile.skills?.join(", ") || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
      });
    } else if (cookies?.user) {
      // First time → fallback to cookie
      setFormData((prev) => ({
        ...prev,
        name: cookies.user.name || "",
        email: cookies.user.email || "",
      }));
    }
  }, [profile, cookies]);

  /* =====================================================
     INPUT HANDLERS
  ===================================================== */

  // Flat fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Nested fields (education / experience)
  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  /* =====================================================
     SUBMIT PROFILE (PATCH)
     - Same API
     - Same logic
     - Converts skills string → array
  ===================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_APP_API}/api/candidate/profile/${userId}`,
        payload,
        { withCredentials: true }
      );

      showToast(res.data.message, "success");
      console.log("Profile updated:", res.data);
      setEditProfile(false);
      fetchCandidateProfile(); // Refresh profile data after update

      // Optionally close edit mode
      // setEditProfile(false);

    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 space-y-8"
      >
        {/* ================= Header ================= */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Edit Profile</h1>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              <FaSave /> Save
            </button>

            <button
              type="button"
              onClick={() => setEditProfile(false)}
              className="bg-gray-100 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        <Divider />

        {/* ================= Personal Info ================= */}
        <Section title="Personal Information" />
        <Grid>
          <Input
            icon={<FaUser />}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            icon={<FaEnvelope />}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />

          <Input
            icon={<FaPhoneAlt />}
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            icon={<FaMapMarkerAlt />}
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>

        <Divider />

        {/* ================= Education ================= */}
        <Section title="Education" />
        <Grid>
          <Input
            label="Degree"
            value={formData.education.degree}
            onChange={(e) =>
              handleNestedChange("education", "degree", e.target.value)
            }
          />
          <Input
            label="University"
            value={formData.education.university}
            onChange={(e) =>
              handleNestedChange("education", "university", e.target.value)
            }
          />
          <Input
            label="Start Year"
            value={formData.education.startYear}
            onChange={(e) =>
              handleNestedChange("education", "startYear", e.target.value)
            }
          />
          <Input
            label="End Year"
            value={formData.education.endYear}
            onChange={(e) =>
              handleNestedChange("education", "endYear", e.target.value)
            }
          />
        </Grid>

        <Divider />

        {/* ================= Experience ================= */}
        <Section title="Experience" />
        <Grid>
          <Input
            label="Role"
            value={formData.experience.role}
            onChange={(e) =>
              handleNestedChange("experience", "role", e.target.value)
            }
          />
          <Input
            label="Company"
            value={formData.experience.company}
            onChange={(e) =>
              handleNestedChange("experience", "company", e.target.value)
            }
          />
          <Input
            label="Start Date"
            value={formData.experience.startDate}
            onChange={(e) =>
              handleNestedChange("experience", "startDate", e.target.value)
            }
          />
          <Input
            label="End Date"
            value={formData.experience.endDate}
            onChange={(e) =>
              handleNestedChange("experience", "endDate", e.target.value)
            }
          />
        </Grid>

        <Divider />

        {/* ================= Skills & Links ================= */}
        <Section title="Professional" />
        <Grid>
          <Input
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
          <Input
            label="GitHub"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
          <Input
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </Grid>
      </form>
    </div>
  );
};

/* ================= Reusable Components ================= */

const Section = ({ title }) => (
  <h2 className="text-lg font-semibold">{title}</h2>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label, value, onChange, name, disabled }) => (
  <div className="bg-slate-50 rounded-xl p-4">
    <label className="text-xs text-gray-500">{label}</label>
    <input
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={`w-full bg-transparent outline-none mt-1 ${disabled ? "text-gray-500" : ""
        }`}
    />
  </div>
);

const Divider = () => <div className="border-t border-gray-200" />;

export default EditProfile;
