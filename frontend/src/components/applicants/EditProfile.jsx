import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";
import axios from "axios";
import { useCookies } from "react-cookie";
import { showToast } from "../../components/Toast";

const EditProfile = ({ setEditProfile, profile, fetchCandidateProfile }) => {
  const [cookies] = useCookies(["user"]);
  const userId = cookies?.user?._id;

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

  useEffect(() => {
    if (profile) {
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
      setFormData((prev) => ({
        ...prev,
        name: cookies.user.name || "",
        email: cookies.user.email || "",
      }));
    }
  }, [profile, cookies]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

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
      setEditProfile(false);
      fetchCandidateProfile();
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 space-y-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Profile
          </h1>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#9810FA] hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium shadow"
            >
              <FaSave /> Save
            </button>

            <button
              type="button"
              onClick={() => setEditProfile(false)}
              className="bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        <Divider />

        <Section title="Personal Information" />
        <Grid>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
          />
        </Grid>

        <Divider />

        <Section title="Education" />
        <Grid>
          <Input
            label="Degree"
            value={formData.education.degree}
            onChange={(e) =>
              handleNestedChange("education", "degree", e.target.value)
            }
            placeholder="B.Tech, MBA, etc."
          />
          <Input
            label="University"
            value={formData.education.university}
            onChange={(e) =>
              handleNestedChange("education", "university", e.target.value)
            }
            placeholder="University name"
          />
          <Input
            label="Start Year"
            value={formData.education.startYear}
            onChange={(e) =>
              handleNestedChange("education", "startYear", e.target.value)
            }
            placeholder="2019"
          />
          <Input
            label="End Year"
            value={formData.education.endYear}
            onChange={(e) =>
              handleNestedChange("education", "endYear", e.target.value)
            }
            placeholder="2023"
          />
        </Grid>

        <Divider />

        <Section title="Experience" />
        <Grid>
          <Input
            label="Role"
            value={formData.experience.role}
            onChange={(e) =>
              handleNestedChange("experience", "role", e.target.value)
            }
            placeholder="Frontend Developer"
          />
          <Input
            label="Company"
            value={formData.experience.company}
            onChange={(e) =>
              handleNestedChange("experience", "company", e.target.value)
            }
            placeholder="Company name"
          />
          <Input
            label="Start Date"
            value={formData.experience.startDate}
            onChange={(e) =>
              handleNestedChange("experience", "startDate", e.target.value)
            }
            placeholder="MM/YYYY"
          />
          <Input
            label="End Date"
            value={formData.experience.endDate}
            onChange={(e) =>
              handleNestedChange("experience", "endDate", e.target.value)
            }
            placeholder="MM/YYYY or Present"
          />
        </Grid>

        <Divider />

        <Section title="Professional" />
        <Grid>
          <Input
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node, MongoDB"
          />
          <Input
            label="GitHub"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub profile link"
          />
          <Input
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn profile link"
          />
        </Grid>
      </form>
    </div>
  );
};

/* Reusable */

const Section = ({ title }) => (
  <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
);

const Input = ({ label, value, onChange, name, disabled, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-lg border bg-white outline-none transition
        ${
          disabled
            ? "bg-gray-100 text-gray-500 border-gray-200"
            : "border-gray-300 focus:border-[#9810FA] focus:ring-2 focus:ring-purple-200"
        }`}
    />
  </div>
);

const Divider = () => <div className="border-t border-gray-200" />;

export default EditProfile;
