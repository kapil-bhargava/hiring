import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapMarkerAlt,
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
    const base =
      "inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full";

    switch (status) {
      case "shortlisted":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <FaCheckCircle /> Shortlisted
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 md:p-6 shadow mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          My Applications
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Track and manage all your job applications
        </p>
      </header>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="animate-pulse text-gray-500">
            Loading your applications...
          </div>
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && jobs.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          <FaBriefcase className="mx-auto text-3xl mb-3 text-purple-400" />
          You haven't applied to any jobs yet.
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && jobs.length > 0 && (
        <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-200 text-slate-700 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Job</th>
                <th className="px-5 py-3 text-left">Location</th>
                <th className="px-5 py-3 text-left">Applied</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4 font-medium text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-purple-600" />
                      <span className="font-medium text-gray-800">
                        {item?.jobId?.title || "N/A"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {item?.jobId?.location || "N/A"}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-500" />
                      {new Date(item.appliedAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    {renderStatus(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MOBILE & TABLET ================= */}
      {!loading && jobs.length > 0 && (
        <div className="lg:hidden space-y-4">
          {jobs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 flex gap-2 items-center">
                    <FaBriefcase className="text-purple-600" />
                    {item?.jobId?.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {item?.jobId?.location}
                  </p>
                </div>
                {renderStatus(item.status)}
              </div>

              <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                Applied on{" "}
                {new Date(item.appliedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
