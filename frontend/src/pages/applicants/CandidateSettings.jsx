import React, { useEffect, useState } from "react";
import {
  FaUserCog,
  FaLock,
  FaBell,
  FaPalette,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";

const CandidateSettings = () => {
  const [settings, setSettings] = useState({
    jobAlerts: true,
    profileVisible: true,
    emailNotifications: true,
    smsNotifications: false,
    interviewReminders: true,
    experienceLevel: "Fresher / Intern",
    theme: "Light",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(()=>{
      document.title = "Settings"
    })
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <FaUserCog /> Candidate Settings
          </h1>
          <p className="text-purple-100 text-sm mt-1">
            Manage your account preferences and notifications
          </p>
        </div>

        {/* ================= Account & Profile ================= */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FaLock className="text-purple-600" /> Account & Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Experience Level */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={settings.experienceLevel}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option>Fresher / Intern</option>
                <option>1–3 Years</option>
                <option>3–5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

            {/* Profile Visibility */}
            <div className="flex items-center justify-between border rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-slate-700">
                Profile visible to recruiters
              </span>
              <input
                type="checkbox"
                name="profileVisible"
                checked={settings.profileVisible}
                onChange={handleChange}
                className="accent-purple-600 w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* ================= Notifications ================= */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FaBell className="text-purple-600" /> Notifications
          </h2>

          <div className="space-y-4">
            {[
              { label: "Job Alerts", name: "jobAlerts" },
              { label: "Email Notifications", name: "emailNotifications" },
              { label: "SMS Notifications", name: "smsNotifications" },
              { label: "Interview Reminders", name: "interviewReminders" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border rounded-xl px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {item.label}
                </span>
                <input
                  type="checkbox"
                  name={item.name}
                  checked={settings[item.name]}
                  onChange={handleChange}
                  className="accent-purple-600 w-5 h-5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= Appearance ================= */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FaPalette className="text-purple-600" /> Appearance
          </h2>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Theme Preference
            </label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="mt-1 w-full md:w-1/2 rounded-xl border border-slate-200 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option>Light</option>
              <option>Dark</option>
              <option>System Default</option>
            </select>
          </div>
        </div>

        {/* ================= Actions ================= */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            <FaSave /> Save Changes
          </button>

          <button className="flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-semibold transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSettings;
