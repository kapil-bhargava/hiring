import React, { useEffect } from "react";
import {
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

const SavedJobs = () => {
  const savedJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Veridia.io",
      location: "Remote",
      savedDate: "14 Feb 2026",
      type: "Internship",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "TechNova",
      location: "Bangalore",
      savedDate: "10 Feb 2026",
      type: "Full Time",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataWorks",
      location: "Hyderabad",
      savedDate: "08 Feb 2026",
      type: "Internship",
    },
  ];

  useEffect(()=>{
      document.title = "Save jobs"
    })
  

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Saved Jobs
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Jobs you saved to apply later
        </p>
      </header>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-200 text-slate-700 uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Saved On</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {savedJobs.map((job, index) => (
              <tr
                key={job.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 font-medium">{index + 1}</td>

                <td className="px-4 py-3 font-semibold text-gray-800">
                  {job.title}
                </td>

                <td className="px-4 py-3">{job.company}</td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {job.location}
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-semibold">
                    {job.type}
                  </span>
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {job.savedDate}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-2 rounded-lg transition">
                      <FaPaperPlane />
                      Apply
                    </button>

                    <button className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 text-xs px-3 py-2 rounded-lg transition">
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-purple-600" />
              <h3 className="font-semibold text-gray-800">{job.title}</h3>
            </div>

            <p className="text-sm text-gray-500">{job.company}</p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt />
              {job.location}
            </div>

            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-semibold w-fit">
              {job.type}
            </span>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt />
              Saved on {job.savedDate}
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition">
                <FaPaperPlane />
                Apply
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 rounded-lg transition">
                <FaTrash />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
