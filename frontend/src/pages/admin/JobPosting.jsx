import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import JobPostingForm from "./JobForm";
  import { toast } from 'react-toastify';

const JobPosting = () => {

  // toast msg function 
  const toastmsg = ()=>{
    toast("saved")
  }

  useEffect(() => {
    document.title = "Job Posting";
  }, []);

  /* Filters */
  const [search, setSearch] = useState("");
  const [experience, setexperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");

  const [jobs, setJobs] = useState([]);
  const [editMode, seteditMode] = useState(false)

  const [jobform, setjobform] = useState(false)


  const API = import.meta.env.VITE_APP_API
  const getJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/job`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, [jobform]);

  const deleteJobs = async (id) => {
    try {
      // alert("hii")
      const res = await axios.delete(`${API}/api/job/${id}`);
      alert(res.data.message);
      setJobs(await getJobs())
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };
  const [singleJob, setSingleJob] = useState({})


  const getSingleJob = async (id) => {
    seteditMode(true)
    try {
      const res = await axios.get(`${API}/api/job/${id}`);
      // alert(res.data.message);
      console.log(res.data)
      setSingleJob(res.data)
      setjobform(true)
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    }
  };








  return jobform ? <JobPostingForm setjobform={setjobform} jobform={jobform} singleJob={singleJob} editMode={editMode} seteditMode={seteditMode} /> :
    (
      <Fragment>
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">

          {/* Header */}
          <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 rounded-xl shadow mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-white">
                Job Postings
              </h1>
              <p className="text-purple-100 text-sm">
                Manage job openings created through the job form
              </p>
            </div>

            <button onClick={() => setjobform(true)} className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50">
              <FaPlus /> Add Job
            </button>
          </header>

          {/* Filters (Form Fields Based) */}
          <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search Job Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />

            <select
              value={experience}
              onChange={(e) => setexperience(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">All Experience</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />


          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-200 text-slate-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">S.No.</th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Job Type</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job, i) => (
                    <tr key={job._id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{i + 1}</td>
                      <td className="px-4 py-3 font-medium">{job.title}</td>
                      <td className="px-4 py-3">{job.location}</td>
                      <td className="px-4 py-3">{job.jobType}</td>
                      <td className="px-4 py-3">{job.experience}</td>
                      <td className="px-4 py-3">{job.salary}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => getSingleJob(job._id)}>
                            <FaEdit /> Edit
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-red-600 text-white hover:bg-red-700" onClick={() => deleteJobs(job._id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form  */}

      </Fragment>
    );
};

export default JobPosting;
