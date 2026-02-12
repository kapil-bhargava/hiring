import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cookie] = useCookies();

  // ================= FETCH JOBS =================
  const getAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/applications/${cookie?.user?._id}`,
        { withCredentials: true }
      );

      setJobs(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cookie?.user?._id) getAppliedJobs();
  }, []);

  // ================= STATUS UI =================
  const renderStatus = (status) => {
    switch (status) {
      case "shortlisted":
        return (
          <span className="badge bg-green-100 text-green-700">
            <FaCheckCircle /> Shortlisted
          </span>
        );
      case "rejected":
        return (
          <span className="badge bg-red-100 text-red-700">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className="badge bg-yellow-100 text-yellow-700">
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          My Applications
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Track status of the jobs you applied for
        </p>
      </header>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading applications...
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && jobs.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          You haven't applied to any jobs yet.
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && jobs.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-200 text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((item, index) => (
                <tr
                  key={item._id} // 🔥 correct key from DB
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>

                  {/* job info from populated jobId */}
                  <td className="px-4 py-3 font-medium">
                    {item?.jobId?.title || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {item?.jobId?.location || "N/A"}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-2">
                    <FaCalendarAlt className="text-purple-500" />
                    {new Date(item.appliedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {renderStatus(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      {!loading && jobs.length > 0 && (
        <div className="md:hidden space-y-4">
          {jobs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-purple-600" />
                <h3 className="font-semibold text-gray-800">
                  {item?.jobId?.title}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                {item?.jobId?.location}
              </p>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Applied On:</span>{" "}
                {new Date(item.appliedAt).toLocaleDateString()}
              </div>

              {renderStatus(item.status)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
