import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import formatDateTime from "../../utils/dateFormatter";
import avtar from "../../assets/int.png";
import { showToast } from "../../components/Toast";

const Rejectedlisted = () => {

  useEffect(() => {
    document.title = "Shortlisted Cndidates"
  })

  const API = import.meta.env.VITE_APP_API;

  const [applicants, setApplicants] = useState([])

  const getAllApplicants = async () => {
    const res = await axios.get(`${API}/api/applicants/job/rejected`);
    console.log(res.data.data);
    setApplicants(res.data.data)
  };


  useEffect(() => {
    getAllApplicants()
  }, [])

  /* Filter state */
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");

  const scheduleInterview = async (applicantId) => {
    showToast("Not in Task")
  };
  const viewApplicant = async (applicantId) => {
    showToast("Not in Task")
  };




  return (
    <Fragment>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">

        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6 rounded-xl shadow mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Shortlisted Candidates
          </h1>
          <p className="text-emerald-100 text-sm mt-1">
            Candidates shortlisted for interview
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search Name / Role / Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

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
              setMode("");
              setDate("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold px-3 py-2"
          >
            Clear
          </button>
        </div>

        {/* Table for Large Screens */}
        <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-200 text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-3">S.n</th>
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Applied Job</th>
                {/* <th className="px-4 py-3">Rejected on</th> */}
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3">Resume Link</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {applicants.length > 0 ? (
                applicants.map((applicant, i) => (
                  <tr
                    key={applicant._id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* S.No */}
                    <td className="px-5 py-4 font-medium text-gray-600">
                      {i + 1}
                    </td>

                    {/* Candidate */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">

                        <img src={import.meta.env.VITE_APP_API + applicant.snapshot.profilePic?.fileUrl || avtar} alt={applicant.snapshot.name || "Profile"} className="w-10 h-10 rounded-full object-cover mb-2" />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            {applicant.snapshot.name || "Unknown Candidate"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {applicant.snapshot.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Job */}
                    <td className="px-5 py-4 text-gray-700">
                      {applicant?.jobId?.title || "Job deleted"}
                    </td>

                    {/* Shortlisted on */}
                    {/* <td className="px-5 py-4 text-gray-700">
                      {applicant.rejectedAt ? formatDateTime(applicant.rejectedAt).split(",")[0] : "N/A"} <br />
                      {applicant.rejectedAt ? formatDateTime(applicant.rejectedAt).split(",")[1].trim() : "N/A"}
                    </td> */}

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full
                  ${applicant.status === "shortlisted"
                            ? "bg-green-100 text-green-700"
                            : applicant.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {applicant.snapshot?.resume ? (
                        <a
                          href={import.meta.env.VITE_APP_API + applicant.snapshot.resume.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-500 text-xs">No Resume</span>
                      )}
                    </td>


                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {/* <button
                          onClick={() => updateApplicantStatus(applicant._id, "shortlisted")}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                          Shortlisted
                        </button> */}

                        <button
                          onClick={() => scheduleInterview(applicant._id, "interview")}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                          Interview
                        </button>

                        <button
                          onClick={() => viewApplicant(applicant._id)}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">

                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card view for Mobile */}
        <div className="lg:hidden space-y-4">
          {applicants.length > 0 ? (
            applicants.map((candidate, index) => (
              <div
                key={candidate._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">#{index + 1}</span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {candidate.status}
                  </span>
                </div>
                <h2 className="font-semibold text-lg">{candidate.name}</h2>
                <p className="text-gray-600">{candidate.role}</p>
                <p className="text-gray-500 text-sm">{candidate.email}</p>
                <p className="text-gray-500 text-sm">
                  {candidate.interviewDate} | {candidate.interviewMode}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">No candidates found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Rejectedlisted;
