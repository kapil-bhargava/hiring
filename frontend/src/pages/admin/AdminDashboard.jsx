import React, { Fragment, useEffect } from "react";

const stats = [
  { id: 1, title: "Total Users", value: "1,520" },
  { id: 2, title: "Active Jobs", value: "34" },
  { id: 3, title: "Monthly Revenue", value: "₹1,20,000" },
];

const recentCandidates = [
  { id: 1, name: "Ramesh Kumar", email: "ramesh@gmail.com" },
  { id: 2, name: "Sita Devi", email: "sita@gmail.com" },
  { id: 3, name: "Amit Singh", email: "amit@gmail.com" },
];

const recentApplications = [
  { id: 1, job: "Frontend Intern", applicant: "Ramesh Kumar" },
  { id: 2, job: "Backend Developer", applicant: "Sita Devi" },
  { id: 3, job: "Data Analyst", applicant: "Amit Singh" },
];

const AdminDashboard = () => {
  useEffect(()=>{
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
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-purple-600 mb-4">
              Recent Candidate Signups
            </h2>

            <ul className="space-y-3">
              {recentCandidates.map((candidate) => (
                <li
                  key={candidate.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium text-gray-700">
                    {candidate.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {candidate.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Job Applications */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-purple-600 mb-4">
              Recent Job Applications
            </h2>

            <ul className="space-y-3">
              {recentApplications.map((app) => (
                <li
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium text-gray-700">
                    {app.applicant}
                  </span>
                  <span className="text-sm text-gray-500">
                    {app.job}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </section>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
