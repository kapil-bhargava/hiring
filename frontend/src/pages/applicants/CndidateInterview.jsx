import React, { useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaBriefcase,
} from "react-icons/fa";

const CandidateInterviews = () => {
  const interviews = [
    {
      id: 1,
      role: "Frontend Developer Intern",
      company: "Veridia.io",
      domain: "Frontend",
      type: "Technical Interview",
      date: "20 Feb 2026",
      time: "11:00 AM",
      mode: "Online",
      status: "Scheduled",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "TechNova",
      domain: "Backend",
      type: "Managerial Round",
      date: "18 Feb 2026",
      time: "02:00 PM",
      mode: "Offline",
      status: "Completed",
    },
    {
      id: 3,
      role: "Data Analyst Intern",
      company: "DataWorks",
      domain: "Data",
      type: "HR Interview",
      date: "15 Feb 2026",
      time: "10:30 AM",
      mode: "Online",
      status: "Selected",
    },
    {
      id: 4,
      role: "UI/UX Designer",
      company: "PixelLabs",
      domain: "Design",
      type: "Technical Interview",
      date: "12 Feb 2026",
      time: "04:00 PM",
      mode: "Online",
      status: "Rejected",
    },
  ];

  const statusStyle = {
    Scheduled: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statusIcon = {
    Scheduled: <FaHourglassHalf />,
    Completed: <FaCheckCircle />,
    Selected: <FaCheckCircle />,
    Rejected: <FaTimesCircle />,
  };

  useEffect(()=>{
      document.title = "Cndidate Interview"
    })
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow mb-6 text-white">
        <h1 className="text-xl md:text-2xl font-semibold">
          My Interviews
        </h1>
        <p className="text-purple-100 text-sm mt-1">
          Track all your interview schedules and outcomes
        </p>
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-700 uppercase">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Interview</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{item.role}</td>
                <td className="px-4 py-3">{item.company}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                    {item.domain}
                  </span>
                </td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3 space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt /> {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock /> {item.time}
                  </div>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {item.mode === "Online" ? (
                    <FaVideo className="text-purple-600" />
                  ) : (
                    <FaBuilding className="text-indigo-600" />
                  )}
                  {item.mode}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyle[item.status]}`}
                  >
                    {statusIcon[item.status]} {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {interviews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-purple-600" />
              <h3 className="font-semibold text-gray-800">{item.role}</h3>
            </div>

            <p className="text-sm text-gray-500">{item.company}</p>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                {item.domain}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                {item.type}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <FaCalendarAlt /> {item.date}
              </div>
              <div className="flex items-center gap-2">
                <FaClock /> {item.time}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                {item.mode === "Online" ? <FaVideo /> : <FaBuilding />}
                {item.mode}
              </span>

              <span
                className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyle[item.status]}`}
              >
                {statusIcon[item.status]} {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateInterviews;
