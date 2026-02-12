import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaBookmark,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const BrowseJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Veridia.io",
      location: "Remote",
      type: "Internship",
      experience: "0–1 Years",
      salary: "₹15k – ₹25k / month",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "TechNova",
      location: "Bangalore",
      type: "Full-Time",
      experience: "1–3 Years",
      salary: "₹8 – ₹12 LPA",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "GreenStack",
      location: "Remote",
      type: "Internship",
      experience: "0–1 Years",
      salary: "₹20k / month",
    },
  ];

  useEffect(() => {
    document.title = "Browse Jobs"
  })

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location ? job.location === location : true) &&
      (type ? job.type === type : true) &&
      (experience ? job.experience === experience : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= Header ================= */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Browse Jobs
          </h1>
          <p className="text-slate-500 mt-2 max-w-xl">
            Find the right job that matches your skills and career goals.
          </p>
        </div>

        {/* ================= Filters ================= */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
            <FaFilter className="text-purple-600" />
            Filters
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Location */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
            </select>

            {/* Job Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-Time">Full-Time</option>
            </select>

            {/* Experience */}
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">All Experience</option>
              <option value="0–1 Years">0–1 Years</option>
              <option value="1–3 Years">1–3 Years</option>
            </select>
          </div>
        </div>

        {/* ================= Job Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-2xl border border-white/40 
              bg-white/70 backdrop-blur-xl shadow-sm 
              hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-purple-600">
                    {job.title}
                  </h2>
                  <p className="text-sm text-slate-500">{job.company}</p>
                </div>

                <span className="inline-block text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {job.salary}
                </span>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-purple-600" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-purple-600" />
                    {job.experience}
                  </div>
                </div>
              </div>

              <div className="border-t p-4 flex gap-3">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-xl">
                  Apply Now
                </button>
                <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-purple-600 hover:bg-purple-50">
                  <FaBookmark />
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <p className="col-span-full text-center text-slate-500">
              No jobs found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
