import React, { useEffect } from "react";
import {
  FaBriefcase,
  FaClipboardList,
  FaUserCheck,
  FaCalendarAlt,
} from "react-icons/fa";

const CandidateDashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Applied Jobs",
      value: 5,
      icon: <FaBriefcase />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      title: "Applications Status",
      value: "In Review",
      icon: <FaClipboardList />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Shortlisted",
      value: 2,
      icon: <FaUserCheck />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Upcoming Interviews",
      value: 1,
      icon: <FaCalendarAlt />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  useEffect(()=>{
    document.title = "Candidate Dashboard"
  })

  return (
    <>
      
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
            Candidate Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Track your job applications and interview status
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition"
            >
              <div
                className={`p-3 rounded-full text-xl ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-purple-600">
                <FaBriefcase />
              </span>
              <p className="text-sm text-gray-600">
                You applied for <span className="font-semibold">Frontend Developer Intern</span>
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 text-green-600">
                <FaUserCheck />
              </span>
              <p className="text-sm text-gray-600">
                You were shortlisted for <span className="font-semibold">Backend Developer</span>
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 text-indigo-600">
                <FaCalendarAlt />
              </span>
              <p className="text-sm text-gray-600">
                Interview scheduled on <span className="font-semibold">22 Feb 2026</span>
              </p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default CandidateDashboard;
