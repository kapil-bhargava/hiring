import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  FaBriefcase,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const CandidateDashboard = () => {

  const [shortListed, setShortListed] = useState(0)
  const [applied, setSetApplied] = useState(0)
  const [pending, setPending] = useState(0)
  const [rejectedCount, setrejectedCount] = useState(0)
  const [cookie,,] = useCookies()

  const userId = cookie.user._id
  const getShortlisted = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/applicants/count/shortlisted/${userId}`)
    setShortListed(res.data.count)
  }
  const getApplied = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/applicants/count/pending/${userId}`)
    setSetApplied(res.data.count + shortListed + rejectedCount)
    setPending(res.data.count)
  }
  const getRejected = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/applicants/count/rejected/${userId}`)
    setrejectedCount(res.data.count)
  }

  useEffect(() => {
    getApplied()
    getRejected()
    getShortlisted()
    document.title = "Candidate Dashboard"
  })

const stats = [
  {
    id: 1,
    title: "Applied Jobs",
    value: applied,
    icon: <FaBriefcase />,
    color: "bg-purple-100 text-[#9810FA]",
  },

  {
    id: 2,
    title: "Shortlisted",
    value: shortListed,
    icon: <FaUserCheck />,
    color: "bg-green-100 text-green-600",
  },

  {
    id: 3,
    title: "Rejected",
    value: rejectedCount,
    icon: <FaUserTimes />,
    color: "bg-red-100 text-red-600",
  },

  {
    id: 4,
    title: "Pending",
    value: pending,
    icon: <FaClock />,
    color: "bg-yellow-100 text-yellow-600",
  },
];


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
        <section className="bg-white rounded-xl shadow p-6 hidden">
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
