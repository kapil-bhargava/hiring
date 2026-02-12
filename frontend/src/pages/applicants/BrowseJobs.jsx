import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaBookmark,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import JobCard from "../../components/public/JobCard";




const BrowseJobs = () => {
  useEffect(() => {
    document.title = "Browse Jobs"
  })


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
        {/* <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold">
          <FaFilter className="text-purple-600" />
          Filters
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          Search
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

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">All Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
          </select>

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
      </div> */}

        <JobCard />
      </div>
    </div>
  );
};

export default BrowseJobs;
