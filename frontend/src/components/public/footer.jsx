import React from "react";
import {
  FaShieldAlt,
  FaFileContract,
  FaHeadset,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold tracking-wide">
            Veridia<span className="text-purple-300">.io</span>
          </h2>
          <p className="text-sm text-purple-200 mt-3 leading-relaxed">
            A modern hiring and applicant management platform designed for
            efficiency, transparency, and growth.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <FaLinkedin className="hover:text-purple-300 cursor-pointer transition" />
            <FaTwitter className="hover:text-purple-300 cursor-pointer transition" />
            <FaGithub className="hover:text-purple-300 cursor-pointer transition" />
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-purple-200">
            <li><Link to="/Jobs" className="hover:text-white transition">Jobs</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-purple-200">
            <li><Link to="/About" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/Contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/" className="hover:text-white transition">Careers</Link></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Legal & Support</h3>
          <ul className="space-y-3 text-sm text-purple-200">

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaShieldAlt />
              <Link to="/privacy">Privacy Policy</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaFileContract />
              <Link to="/terms">Terms of Service</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaHeadset />
              <Link to="/Contact">Support</Link>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-600 text-center py-4 text-sm text-purple-200">
        © {new Date().getFullYear()} <span className="font-semibold">Veridia.io</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
