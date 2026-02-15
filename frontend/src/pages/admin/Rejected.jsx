import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import formatDateTime from "../../utils/dateFormatter";
import avtar from "../../assets/int.png";
import { showToast } from "../../components/Toast";

const Rejectedlisted = () => {

  useEffect(() => {
    document.title = "Rejected Candidates";
  }, []);

  const API = import.meta.env.VITE_APP_API;
  const [applicants, setApplicants] = useState([]);

  const getAllApplicants = async () => {
    const res = await axios.get(`${API}/api/applicants/job/rejected`);
    setApplicants(res.data.data);
  };

  useEffect(() => {
    getAllApplicants();
  }, []);

  /* Filter state */
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");

  const scheduleInterview = async () => {
    showToast("Not in Task");
  };

  const viewApplicant = async () => {
    showToast("Not in Task");
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">

        {/* Header */}
        <header className="bg-gradient-to-r from-[#9810FA] to-indigo-600 p-5 rounded-xl shadow mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Rejected Candidates
          </h1>
          <p className="text-purple-100 text-sm mt-1">
            Manage candidates who were not selected
          </p>
        </header>


        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-purple-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Rejected On</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Resume</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((applicant, i) => (
                    <tr key={applicant._id} className="hover:bg-purple-50">
                      <td className="px-4 py-4">{i + 1}</td>

                      <td className="px-4 py-4">
                        <div className="flex gap-3 items-center">
                          <img
                            src={
                              import.meta.env.VITE_APP_API +
                              applicant.snapshot?.profilePic?.fileUrl ||
                              avtar
                            }
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">
                              {applicant.snapshot?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {applicant.snapshot?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {applicant?.jobId?.title || "Deleted"}
                      </td>

                      <td className="px-4 py-4 text-xs text-gray-500">
                        {applicant.rejectedAt
                          ? formatDateTime(applicant.rejectedAt)
                          : "N/A"}
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 capitalize">
                          {applicant.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {applicant.snapshot?.resume ? (
                          <a
                            href={
                              import.meta.env.VITE_APP_API +
                              applicant.snapshot.resume.fileUrl
                            }
                            target="_blank"
                            className="text-[#9810FA] hover:underline text-xs"
                          >
                            View Resume
                          </a>
                        ) : (
                          "No resume"
                        )}
                      </td>

                      <td className="px-4 py-4 flex gap-2">
                        <button
                          onClick={() => scheduleInterview(applicant._id)}
                          className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-md"
                        >
                          Interview
                        </button>

                        <button
                          onClick={() => viewApplicant(applicant._id)}
                          className="px-3 py-1 text-xs bg-purple-600 text-white rounded-md"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No applicants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="lg:hidden space-y-4">
          {applicants.length > 0 ? (
            applicants.map((applicant, i) => (
              <div
                key={applicant._id}
                className="bg-white rounded-xl shadow border p-4"
              >
                <div className="flex gap-3 items-center">
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
                      {applicant.snapshot?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {applicant.snapshot?.email}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-sm">
                  <span className="font-medium">Job:</span>{" "}
                  {applicant?.jobId?.title}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {applicant.rejectedAt
                    ? formatDateTime(applicant.rejectedAt)
                    : ""}
                </p>

                <span className="mt-2 inline-block px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                  {applicant.status}
                </span>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => scheduleInterview(applicant._id)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
                  >
                    Interview
                  </button>

                  <button
                    onClick={() => viewApplicant(applicant._id)}
                    className="flex-1 bg-[#9810FA] text-white py-2 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">
              No candidates found
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Rejectedlisted;
