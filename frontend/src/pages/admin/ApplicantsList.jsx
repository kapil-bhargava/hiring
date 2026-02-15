import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { showToast } from "../../components/toast";
import formatDateTime from "../../utils/dateFormatter";
import avtar from "../../assets/int.png";
import ApplicantProfile from "../../components/admin/ApplicantProfile";
import Loader from "../../components/Loader";

const ApplicantsList = () => {
  const [loader, setLoader] = useState(false)

  const API = import.meta.env.VITE_APP_API;

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  // const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [jobId, setJobId] = useState()
  const [jobs, setJobs] = useState([])


  // 🔍 search state (input box value)
  const [search, setSearch] = useState("");

  // 📊 applicants state
  const [applicants, setApplicants] = useState([]);

  // ⏳ loader for better UX
  const [jobloader, setjobloader] = useState(false);


  // 🚀 Fetch applicants from backend
  const getAllApplicants = async () => {
    try {
      setjobloader(true);

      /**
       * ✅ Build URL dynamically
       * If search is empty → backend returns all applicants
       * If search has value → backend filters data
       */
      let url = `${API}/api/applicants/job/pending`;

      /**
       * 🔍 Add search query only if user typed something
       * This prevents unnecessary filtering
       */
      if (search.trim() !== "") {
        url += `?search=${search}`;
      }

      /**
       * 📡 API call
       */
      const res = await axios.get(url);

      /**
       * 📊 Store applicants in state
       */
      setApplicants(res.data.data);

    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setjobloader(false);
    }
  };



  // GETTING ALL JOBS 

  const getJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/job`);
      console.log(res.data.data);
      setJobs(res.data.data)
    } catch (error) {
      console.error(error);
    }
  };


  const getSelectedJobApplicants = async (jobId) => {
    try {
      const res = await axios.get(`${API}/api/applicants/${jobId}`);
      console.log(res.data.data);
      setApplicants(res.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getAllApplicants();
    }, 500); // wait 500ms

    return () => clearTimeout(delay);
  }, [search]);


  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    console.log("hh", jobs)
    document.title = "Applicants List"
  }, [])


  const updateApplicantStatus = async (id, status) => {
    setLoader(true)
    const res = await axios.put(
      `${API}/api/applicants/${id}/status`,
      { status }
    );

    showToast(res.data.message);
    setLoader(false)
    getAllApplicants()

  };


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
          <div className="flex flex-col">
            <label htmlFor="">Search </label>
            <input
              type="text"
              placeholder="Search name / email / status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-col">

            <label htmlFor="">Select Jobs</label>
            <select
              // value={jobId}
              onChange={(e) => getSelectedJobApplicants(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Job</option>
              {
                jobs.length > 0 ? jobs.map((job, index) => {
                  return (
                    <option key={job._id} value={job._id}>{job.title}</option>
                  )
                }) : <option>No jobs</option>
              }
            </select>
          </div>

          {/* <select
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Schemes</option>
            <option>PMAY</option>
            <option>Ujjwala</option>
            <option>MNREGA</option>
          </select> */}

          {/* <button
            onClick={() => {
              setSearch("");
              setDomain("");
              setScheme("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
          >
            Clear
          </button> */}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-purple-50 text-gray-700 uppercase text-xs sticky top-0">
                <tr>
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Candidate</th>
                  <th className="px-5 py-3">Job</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Applied</th>
                  <th className="px-5 py-3">Resume</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {applicants.length > 0 ? (
                  applicants.map((applicant, i) => (
                    <tr key={applicant._id} className="hover:bg-purple-50 transition">
                      <td className="px-5 py-4 font-medium text-gray-600">
                        {i + 1}
                      </td>

                      {/* Candidate */}
                      <td className="px-5 py-4">
                        <div className="flex gap-3 items-center">
                          <img
                            src={
                              import.meta.env.VITE_APP_API +
                              applicant.snapshot?.profilePic?.fileUrl || avtar
                            }
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="font-medium text-gray-800">
                              {applicant.snapshot.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {applicant.snapshot.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {applicant.jobId.title || "Job deleted"}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize
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

                      <td className="px-5 py-4 text-xs text-gray-500">
                        {formatDateTime(applicant.appliedAt)}
                      </td>

                      <td className="px-5 py-4">
                        {applicant.snapshot?.resume ? (
                          <a
                            href={
                              import.meta.env.VITE_APP_API +
                              applicant.snapshot.resume.fileUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9810FA] font-medium hover:underline text-xs"
                          >
                            View Resume
                          </a>
                        ) : (
                          "No resume"
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              updateApplicantStatus(
                                applicant._id,
                                "shortlisted"
                              )
                            }
                            className="px-3 py-1.5 text-xs rounded-md bg-green-600 text-white hover:bg-green-700"
                          >
                            Shortlist
                          </button>

                          <button
                            onClick={() =>
                              updateApplicantStatus(applicant._id, "rejected")
                            }
                            className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : jobloader ? null : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No applicants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {applicants.length > 0 ? (
            applicants.map((applicant, i) => (
              <div
                key={applicant._id}
                className="bg-white rounded-xl shadow border p-4"
              >
                {/* Top */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      import.meta.env.VITE_APP_API +
                      applicant.snapshot?.profilePic?.fileUrl || avtar
                    }
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <p className="font-semibold">
                      {applicant.snapshot.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {applicant.snapshot.email}
                    </p>
                  </div>
                </div>

                {/* Job */}
                <div className="mt-3 text-sm">
                  <span className="font-medium">Job:</span>{" "}
                  {applicant.jobId.title || "Deleted"}
                </div>

                {/* Status */}
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full capitalize
              ${applicant.status === "shortlisted"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {applicant.status}
                  </span>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 mt-2">
                  {formatDateTime(applicant.appliedAt)}
                </div>

                {/* Resume */}
                {applicant.snapshot?.resume && (
                  <a
                    href={
                      import.meta.env.VITE_APP_API +
                      applicant.snapshot.resume.fileUrl
                    }
                    target="_blank"
                    className="block text-[#9810FA] text-sm mt-2"
                  >
                    View Resume
                  </a>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      updateApplicantStatus(applicant._id, "shortlisted")
                    }
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() =>
                      updateApplicantStatus(applicant._id, "rejected")
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : jobloader ? null : (
            <p className="text-center text-gray-500">No applicants found</p>
          )}
        </div>


      </div>

      {/* Applicant profile modal */}
      {selectedCandidate && (
        <ApplicantProfile
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {/* Loader  */}
      {
        loader &&
        <Loader message="Updating Status..." />
      }
      {
        jobloader &&
        <Loader message="Getting applicants..." />
      }
    </Fragment>
  );
};

export default ApplicantsList;
