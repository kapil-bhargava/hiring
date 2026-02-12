import React, { useEffect, useState } from "react";

const candidatesData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    role: "Frontend Intern",
    date: "2026-02-18",
  },
  {
    id: 2,
    name: "Sita Devi",
    email: "sita@gmail.com",
    role: "Backend Developer",
    date: "2026-02-19",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@gmail.com",
    role: "Data Analyst Intern",
    date: "2026-02-20",
  },
];


const SignUpTable = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");

  const filteredData = candidatesData.filter((item) => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())) &&
      (role ? item.role === role : true) &&
      (date ? item.date === date : true)
    );
  });
  useEffect(()=>{
    document.title = "Candidate Signup"
  })


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-purple-600">
          Candidate Signups
        </h1>
        <p className="text-sm text-gray-500">
          Manage registered candidates
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search name or email"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Frontend Intern">Frontend Intern</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Data Analyst Intern">Data Analyst Intern</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-3 py-2 text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={() => {
            setSearch("");
            setRole("");
            setDate("");
          }}
          className="bg-purple-600 text-white rounded-lg text-sm px-4 py-2 hover:bg-purple-700 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* ================= TABLE VIEW (Desktop) ================= */}
      <div className="hidden md:block bg-white rounded-xl border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-purple-50 text-purple-600">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Signup Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.role}</td>
                <td className="px-4 py-3">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARD VIEW (Mobile) ================= */}
      <div className="md:hidden space-y-4">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border p-4"
          >
            <h3 className="font-semibold text-purple-600">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.email}</p>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-600">{item.role}</span>
              <span className="text-gray-500">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-6">
          No candidates found
        </p>
      )}
    </div>
  );
};

export default SignUpTable;
