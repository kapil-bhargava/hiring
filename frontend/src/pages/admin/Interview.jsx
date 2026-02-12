import React, { Fragment, useEffect, useState } from "react";

const Interview = () => {
  const interviewCandidates = [
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Frontend Developer Intern",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      interviewDate: "2026-02-22",
      interviewTime: "11:00 AM",
      interviewMode: "Online",
      interviewer: "HR Team",
    },
    {
      id: 2,
      name: "Sita Devi",
      role: "Backend Developer",
      email: "sita@gmail.com",
      phone: "9123456789",
      interviewDate: "2026-02-23",
      interviewTime: "02:00 PM",
      interviewMode: "Offline",
      interviewer: "Tech Lead",
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Data Analyst Intern",
      email: "amit@gmail.com",
      phone: "9988776655",
      interviewDate: "2026-02-24",
      interviewTime: "10:30 AM",
      interviewMode: "Online",
      interviewer: "Analytics Manager",
    },
  ];

useEffect(()=>{
    document.title = "Interviews"
  })

  /* Filters state */
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");

  /* Filter logic */
  const filteredCandidates = interviewCandidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);

    const matchesRole = role ? c.role === role : true;
    const matchesMode = mode ? c.interviewMode === mode : true;
    const matchesDate = date ? c.interviewDate === date : true;

    return matchesSearch && matchesRole && matchesMode && matchesDate;
  });
  

  return (
    <Fragment>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6 rounded-xl shadow mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Interview Round
          </h1>
          <p className="text-purple-100 text-sm mt-1">
            Candidates selected for final interview
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <input
            type="text"
            placeholder="Search name / email / phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Roles</option>
            <option>Frontend Developer Intern</option>
            <option>Backend Developer</option>
            <option>Data Analyst Intern</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Modes</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            onClick={() => {
              setSearch("");
              setRole("");
              setMode("");
              setDate("");
            }}
            className="bg-slate-200 hover:bg-slate-300 rounded-lg px-3 py-2 font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            
            <thead className="bg-slate-200 text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Interview Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Interviewer</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {candidate.name}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.role}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.email}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.phone}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.interviewDate}
                    </td>
                    <td className="px-4 py-3">
                      {candidate.interviewTime}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          candidate.interviewMode === "Online"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {candidate.interviewMode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {candidate.interviewer}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500"
                  >
                    No candidates found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Interview;
