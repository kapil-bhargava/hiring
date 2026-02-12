import React, { Fragment, useEffect } from "react";
import {
  FaBullseye,
  FaEye,
  FaUserCheck,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

const About = () => {

  useEffect(()=>{
      document.title = "About"
    })

  return (
    <Fragment>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">

        {/* Header Section */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow p-6 md:p-8 mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            About Veridia.io
          </h1>
          <p className="text-purple-100 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Veridia.io is a modern hiring and applicant management platform
            designed to simplify recruitment, shortlisting, and interview
            processes for organizations.
          </p>
        </header>

        {/* About Content */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Mission Card */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FaBullseye className="text-indigo-600 text-2xl" />
              <h2 className="text-xl font-semibold text-indigo-600">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our mission is to make hiring transparent, efficient, and
              data-driven by providing a seamless platform for managing
              applicants, job postings, interviews, and final selections.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <FaEye className="text-purple-600 text-2xl" />
              <h2 className="text-xl font-semibold text-purple-600">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              We envision a future where recruiters and candidates experience
              a fast, fair, and user-friendly hiring journey powered by
              technology.
            </p>
          </div>

        </section>

        {/* Premium Features Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-6">
            Premium Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Feature Card */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-600 hover:scale-105 transition">
              <FaUserCheck className="text-indigo-600 text-3xl mb-3" />
              <h3 className="font-semibold text-indigo-600 mb-2">
                Smart Applicant Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Easily manage applicants from registration to final selection
                with real-time status updates.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-purple-600 hover:scale-105 transition">
              <FaCalendarCheck className="text-purple-600 text-3xl mb-3" />
              <h3 className="font-semibold text-purple-600 mb-2">
                Interview Management
              </h3>
              <p className="text-gray-600 text-sm">
                Schedule, track, and manage interviews efficiently with
                structured interview rounds.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-600 hover:scale-105 transition">
              <FaShieldAlt className="text-indigo-600 text-3xl mb-3" />
              <h3 className="font-semibold text-indigo-600 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 text-sm">
                We ensure data security and reliability for both applicants
                and hiring teams.
              </p>
            </div>

          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Veridia.io — All rights reserved
        </footer>

      </div>
    </Fragment>
  );
};

export default About;
