import React, { Fragment, useEffect } from "react";
import logo from '../../assets/logo.jpeg'

const JobApply = () => {
useEffect(()=>{
    document.title = "Apply Jobs"
  })

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        
        {/* Form Card */}
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 md:p-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Veridia.io"
              className="h-12"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center">
            Hiring Application Form
          </h1>
          <p className="text-gray-500 text-center mt-1 mb-6">
            Join Veridia.io – Apply for open positions
          </p>

          {/* Form */}
          <form className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Applying For
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Role</option>
                <option>SDE Intern</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Data Analyst</option>
                <option>ML Engineer</option>
                <option>UI/UX Designer</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Experience Level
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Experience</option>
                <option>Fresher</option>
                <option>0–1 Years</option>
                <option>1–3 Years</option>
                <option>3+ Years</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Key Skills
              </label>
              <textarea
                rows="3"
                placeholder="Mention your skills (e.g., React, Node, Python)"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Resume Link (Google Drive / Dropbox)
              </label>
              <input
                type="url"
                placeholder="Paste resume link"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit Application
            </button>

          </form>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-4">
            © {new Date().getFullYear()} Veridia.io. All rights reserved.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default JobApply;
