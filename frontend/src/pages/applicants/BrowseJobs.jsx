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

        <JobCard />
      </div>
    </div>
  );
};

export default BrowseJobs;
