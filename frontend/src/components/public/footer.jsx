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
    <footer className="bg-gradient-to-br from-[#9810FA] via-purple-700 to-indigo-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            Veridia<span className="text-purple-200">.io</span>
          </h2>

          <p className="text-sm text-purple-100 mt-4 leading-relaxed">
            A modern hiring and applicant tracking platform that helps
            organizations build strong teams with transparency, speed,
            and efficiency.
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-5 text-lg">
            <FaLinkedin className="hover:text-white/80 cursor-pointer transition" />
            <FaTwitter className="hover:text-white/80 cursor-pointer transition" />
            <FaGithub className="hover:text-white/80 cursor-pointer transition" />
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Product</h3>

          <ul className="space-y-3 text-sm text-purple-100">
            <li>
              <Link to="/jobs" className="hover:text-white transition">
                Explore Jobs
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Candidate Dashboard
              </Link>
            </li>

            <li>
              <Link to="/admin" className="hover:text-white transition">
                Recruiter Portal
              </Link>
            </li>

            <li>
              <Link to="/features" className="hover:text-white transition">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>

          <ul className="space-y-3 text-sm text-purple-100">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/careers" className="hover:text-white transition">
                Careers
              </Link>
            </li>

            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Legal & Support</h3>

          <ul className="space-y-3 text-sm text-purple-100">

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaShieldAlt />
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaFileContract />
              <Link to="/terms-and-conditions">Terms of Service</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-white transition">
              <FaHeadset />
              <Link to="/support">Help & Support</Link>
            </li>

            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 text-center py-5 text-sm text-purple-100">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">Veridia.io</span> — Empowering modern
        hiring and career growth.
      </div>

    </footer>
  );
};

export default Footer;
