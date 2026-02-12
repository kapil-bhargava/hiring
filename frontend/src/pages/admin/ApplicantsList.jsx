import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { showToast } from "../../components/toast";
import formatDateTime from "../../utils/dateFormatter";
import avtar from "../../assets/int.png";
import ApplicantProfile from "../../components/admin/ApplicantProfile";

const ApplicantsList = () => {
  const API = import.meta.env.VITE_APP_API;

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const [applicants, setApplicants] = useState([])

  const getAllApplicants = async () => {
    const res = await axios.get(`${API}/api/applicants/job/pending`);
    console.log(res.data.data);
    setApplicants(res.data.data)
  };


  useEffect(() => {
    getAllApplicants()
  }, [])

  useEffect(() => {
    document.title = "Applicants List"
  }, [])


  const updateApplicantStatus = async (id, status) => {
    const res = await axios.put(
      `${API}/api/applicants/${id}/status`,
      { status }
    );

    console.log(res.data)
    showToast(res.data.message);
    getAllApplicants()

  };

  /* Filters */
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [scheme, setScheme] = useState("");

  /* Filter Logic */
  // const filteredApplicants = applicants.filter((a) => {
  //   const matchesSearch =
  //     a.name.toLowerCase().includes(search.toLowerCase()) ||
  //     a.village.toLowerCase().includes(search.toLowerCase()) ||
  //     a.scheme.toLowerCase().includes(search.toLowerCase());

  //   const matchesDomain = domain ? a.village === domain : true;
  //   const matchesScheme = scheme ? a.scheme === scheme : true;

  //   return matchesSearch && matchesDomain && matchesScheme;
  // });

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex-1">

        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6 rounded-lg shadow mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Applicants List
          </h1>
          <p className="text-purple-100 text-sm mt-1">
            Manage scheme applicants
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search name / domain / scheme"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Domains</option>
            <option>Data-Science</option>
            <option>WebDevelopment</option>
            <option>Frontend</option>
          </select>

          <select
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Schemes</option>
            <option>PMAY</option>
            <option>Ujjwala</option>
            <option>MNREGA</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setDomain("");
              setScheme("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">Job</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Applied At</th>
                <th className="px-5 py-3">Resume Link</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
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

                        <img src={import.meta.env.VITE_APP_API + applicant.snapshot?.profilePic?.fileUrl || avtar} alt={applicant.snapshot?.fileName || "Profile"} className="w-10 h-10 rounded-full object-cover mb-2" />
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
                      {applicant.jobId.title}
                    </td>

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
                      <span className="text-xs text-gray-500">
                        {/* {new Date(applicant.createdAt).toLocaleDateString()} <br />
                        {new Date(applicant.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                        {formatDateTime(applicant.appliedAt).split(",")[0]} <br />
                        {formatDateTime(applicant.appliedAt).split(",")[1].trim()}
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
                        <button
                          onClick={() => updateApplicantStatus(applicant._id, "shortlisted")}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                          Shortlist
                        </button>

                        <button
                          onClick={() => updateApplicantStatus(applicant._id, "rejected")}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                          Reject
                        </button>

                        {/* <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                          View
                        </button> */}
                        <button
                          onClick={() => setSelectedCandidate(applicant.snapshot)}
                          className="text-indigo-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
      
      {/* Applicant profile modal */}
      {selectedCandidate && (
        <ApplicantProfile
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </Fragment>
  );
};

export default ApplicantsList;
