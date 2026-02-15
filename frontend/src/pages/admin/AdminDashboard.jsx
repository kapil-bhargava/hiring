import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";


const AdminDashboard = () => {
  const [totalJobs, setTotalJObs] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalApplicants, setTotalApplicants] = useState(0)
  const stats = [
    { id: 1, title: "Total Users", value: totalUsers },
    { id: 2, title: "Total Jobs", value: totalUsers },
    { id: 3, title: "Total Applicants", value: totalApplicants },
  ];
  


  const getApplicants = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/applicants/count`)
    setTotalApplicants(res.data.count)
    console.log(res.data)
  }
  const getUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/users/count`)
    setTotalUsers(res.data.count)
    console.log(res.data)
  }
  useEffect(() => {
    getApplicants()
    getUsers()
    document.title = "Admin Dashboard"
  })
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-purple-600">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of recent activity
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-semibold text-purple-600 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Candidate Signup */}
          {/* <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-purple-600 mb-4">
              Recent Candidate Signups
            </h2>

          </div> */}

          {/* Recent Job Applications */}
          {/* <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-purple-600 mb-4">
              Recent Job Applications
            </h2>

          </div> */}

        </section>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
