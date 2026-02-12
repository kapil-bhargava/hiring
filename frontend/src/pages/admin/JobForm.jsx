import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react'
import { showToast } from "../../components/toast";

const JobPostingForm = ({ setjobform, singleJob, jobform, editMode, seteditMode }) => {
  const [formData, setFormData] = useState({
    title: "kg",
    jobType: "",
    location: "",
    experience: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const API = import.meta.env.VITE_APP_API

  const navigate = useNavigate()


  //  create jobs =======
  const createJob = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/api/job`, formData)
    console.log(res.data)
    // navigate("/admin/jobposting")
    setjobform(false)
    showToast(res.data.msg)
  }

  // update jobs =====
  const updateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API}/api/job`, formData);
      showToast(res.data.message)
      setjobform(false)
    } catch(err){
      showToast(err.message, "error")
    }
  }


  useEffect(() => {
    if (singleJob) {
      setFormData({
        title: singleJob.title || "",
        jobType: singleJob.jobType || "",
        location: singleJob.location || "",
        experience: singleJob.experience || "",
        salary: singleJob.salary || "",
        description: singleJob.description || "",
        id: singleJob._id
      });
    }
  }, [singleJob]);




  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <ArrowLeft className="cursor-pointer" onClick={() => { setjobform(false); seteditMode(false) }} />
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
          {editMode ? "Edit Job" : "Post a New Job"}
        </h1>
        <p className="text-gray-500 mt-2">
          Create a job posting to hire the right candidates
        </p>
      </header>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 md:p-8">
        <form onSubmit={editMode ? updateJob : createJob} className="space-y-6">

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Frontend Developer Intern"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="Fresher / Empolyee"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Bengaluru, India"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="Salary"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>


          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Write the job responsibilities and requirements..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center" >
            {/* <Link to="/admin/jobposting"> */}
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              {editMode ? "Update Job" : "Post Job"}
            </button>
            {/* </Link> */}

          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;
