import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaBookmark,
} from "react-icons/fa";

const AppliedJobs = () => {

  const [jobs, setJobs] = useState([]);

  // getting logged in user's applied jobs 
  const [cookie, ,] = useCookies();
  const getAppliedJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/applications/${cookie.user._id}`);
      console.log(response.data.data)
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  }


  useEffect(() => {
    getAppliedJobs();
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Applied & Saved Jobs
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Manage your job applications and saved opportunities
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
              <th className="px-4 py-3">Last Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 ? jobs.map((job, index) => (
              <tr key={job.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{job.jobId.title}</td>
                <td className="px-4 py-3">{job.company || "N/A"}</td>
                <td className="px-4 py-3">{job.jobId.location}</td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  {job.lastDate}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    {job.status === "Applied" ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        <FaCheckCircle /> Applied
                      </span>
                    ) : (
                      <>
                        <button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-2 rounded-lg transition">
                          <FaPaperPlane /> Apply
                        </button>

                        <button
                          className={`inline-flex items-center gap-2 text-xs px-4 py-2 rounded-lg transition
                          ${job.saved
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-gray-700 hover:bg-slate-200"
                            }`}
                        >
                          <FaBookmark />
                          {job.saved ? "Saved" : "Save"}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No applied jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-purple-600" />
              <h3 className="font-semibold text-gray-800">{job.title}</h3>
            </div>

            <p className="text-sm text-gray-500">{job.company}</p>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Last Date:</span>{" "}
              <span className="text-purple-600">{job.lastDate}</span>
            </div>

            {job.status === "Applied" ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                <FaCheckCircle /> Applied
              </span>
            ) : (
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                  <FaPaperPlane /> Apply
                </button>

                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                  ${job.saved
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-gray-700"
                    }`}
                >
                  <FaBookmark />
                  {job.saved ? "Saved" : "Save"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
