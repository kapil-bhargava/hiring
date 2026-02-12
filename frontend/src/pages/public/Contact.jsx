import React, { Fragment, useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", formData);
  };

  useEffect(()=>{
      document.title = "Contact"
    })

  return (
    <Fragment>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">

        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow p-6 md:p-8 mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Contact Us
          </h1>
          <p className="text-purple-100 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            We’d love to hear from you. Reach out anytime for support or queries.
          </p>
        </header>

        {/* Content */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
              <FaPaperPlane /> Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Email */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-600 hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-2">
                <FaEnvelope className="text-indigo-600 text-xl" />
                <h3 className="font-semibold text-indigo-600">
                  Email Us
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                support@veridia.io
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-purple-600 hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-2">
                <FaPhoneAlt className="text-purple-600 text-xl" />
                <h3 className="font-semibold text-purple-600">
                  Call Us
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                +91 98765 43210
              </p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow p-6 border-t-4 border-indigo-600 hover:scale-105 transition sm:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                <h3 className="font-semibold text-indigo-600">
                  Office Address
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Veridia.io, Tech Park, Bengaluru, Karnataka, India
              </p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Veridia.io — All rights reserved
        </footer>

      </div>
    </Fragment>
  );
};

export default Contact;
