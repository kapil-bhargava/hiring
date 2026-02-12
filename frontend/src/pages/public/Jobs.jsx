import React, { useEffect, useState } from "react";
import Header from "../../components/public/header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/toast";

import axios from "axios";
const Jobs = () => {
  const [cookies] = useCookies();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const API = import.meta.env.VITE_APP_API;

  /* ----------------------------------
     FETCH ALL JOBS (PUBLIC)
     Anyone can see jobs (logged in or not)
  ---------------------------------- */
  const getJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/job`);
      setJobs(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ----------------------------------
     FETCH USER APPLICATIONS (PRIVATE)
     Only when user is logged in
  ---------------------------------- */
  const getMyApplications = async () => {
    if (!cookies.user) return; // ❌ do nothing if not logged in

    try {
      const candidateId = cookies.user._id;
      const res = await axios.get(`${API}/api/applications/${candidateId}`);
      setApplications(res.data.data);
      console.log(res.data)
    } catch (err) {
      // showToast(err.message);
      console.log(err.message)
    }
  };


  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);


  const handleApplyJob = async (jobId) => {
    // 🚫 If user is not logged in
    if (!cookies.user) {
      showToast("Please login first to apply");
      return;
    }
    try {
      setLoader(true);
      const res = await axios.post(`${API}/api/apply`, {
        jobId,
        candidateId: cookies.user._id,
      });

      if (res.data?.success === false) {
        const { message } = res.data;
        
        showToast(message);
        
        setTimeout(() => {
          if (message === "Please create your profile") {
            navigate("/candidate/profile");
          } else if (message === "Please upload your resume before applying") {
            navigate("/candidate/profile");
          }
        }, 1000);
        
        
        return;
      }
      
      setLoader(false);
      showToast(res.data.message);
      // ✅ Success → update UI instantly
      setApplications((prev) => [
        ...prev,
        { jobId: { _id: jobId } },
      ]);
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      // showToast(message);

      // 🔁 Profile / Resume incomplete → redirect
      if (
        message === "Please create your profile" ||
        message === "Resume not uploaded" ||
        message === "Please complete your profile"
      ) {
        setTimeout(() => {
          navigate("/candidate/profile");
        }, 1000)
      }
    }
  };

  /* ----------------------------------
     SIDE EFFECTS
  ---------------------------------- */

  // Fetch all jobs (public)
  useEffect(() => {
    getJobs();
  }, []);

  // Fetch applications only when user logs in
  useEffect(() => {
    if (cookies.user) {
      getMyApplications();
    }
  }, [cookies.user]);

  // Page title
  useEffect(() => {
    document.title = "Jobs";
  }, []);

  /* ----------------------------------
     CREATE ARRAY OF APPLIED JOB IDs
     Used to disable Apply button
  ---------------------------------- */

  // const [appliedJobIds, setAppliedJobIds] = useState([])
  // useEffect(() => {
  //   if (applications.length > 0) {
  //     const jj = applications.map(
  //       (app) => app.jobId._id
  //     );
  //     setAppliedJobIds(jj)
  //   }
  // }, [])

  // const [appliedJobIds, setAppliedJobIds] = useState([])
  // if (applications.length > 0) {
  const appliedJobIds = applications
    .filter(app => app.jobId?._id)
    .map(app => app.jobId._id);
  // }


  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Open Positions at <span className="text-purple-600">Veridia</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore current job opportunities and find the role that matches your
            skills and career goals.
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => {
            const hasApplied =
              cookies.user && appliedJobIds.includes(job._id);

            return (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
              >
                {/* Job Header */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h3>

                {/* Job Info */}
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Location:</span> {job.location}</p>
                  <p><span className="font-medium">Job Type:</span> {job.jobType}</p>
                  <p><span className="font-medium">Experience:</span> {job.experience}</p>
                  <p><span className="font-medium">Salary:</span> {job.salary}</p>
                </div>

                {/* Description */}
                <p className="mt-4 text-gray-600 text-sm line-clamp-3">
                  {job.description}
                </p>

                {/* Action */}
                <div className="mt-auto pt-6">
                  <button
                    onClick={() => handleApplyJob(job._id)}
                    disabled={hasApplied}
                    className={`w-full px-4 py-2 rounded text-white
                      ${hasApplied
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                      }`}
                  >
                    {hasApplied ? "Applied" : "Apply Now"}
                    {/* {hasApplied ? "Applied" : loader ? "Applying..." : "Apply Now"} */}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {
          loader && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-800 font-medium">Applying...</p>
              </div>
            </div>
          )
        }
      </section>
    </>
  );
};

export default Jobs;
