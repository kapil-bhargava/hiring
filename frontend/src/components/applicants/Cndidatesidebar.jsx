import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  FaTimes,
  FaTachometerAlt,
  FaSearch,
  FaBriefcase,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const CandidateSidebar = ({ isOpen, setIsOpen }) => {
  const [cookie, , removecookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/candidate/dashboard" },
    { name: "Browse Jobs", icon: <FaSearch />, path: "/candidate/browse-jobs" },
    { name: "Applied Jobs", icon: <FaBriefcase />, path: "/candidate/applied-jobs" },
    { name: "Profile", icon: <FaUser />, path: "/candidate/profile" },
    { name: "Settings", icon: <FaUser />, path: "/candidate/settings" },
  ];

  useEffect(() => {
    if (!cookie.user) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    document.title = "Candidate Sidebar";
  });

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="bg-white border-b p-3 text-center">
          <Link to="/">
            <img src={logo} className="w-30 m-auto" alt="logo" />
          </Link>
          <span className="block text-sm text-black mt-1">
            {cookie.user ? cookie.user.name : ""}
          </span>

          <button className="md:hidden absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path; // ✅ active check

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg
                  transition font-medium
                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
                  }`}
              >
                <span
                  className={`text-lg ${
                    isActive ? "text-purple-700" : "text-purple-600"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}

          {/* Logout */}
          {/* <button
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg
              text-gray-700 hover:bg-purple-100 hover:text-purple-600
              transition font-medium cursor-pointer"
            onClick={() => {
              removecookie("user");
              navigate("/signin");
            }}
          >
            <span className="text-lg text-purple-600">
              <FaSignOutAlt />
            </span>
            <span className="text-sm">Logout</span>
          </button> */}
        </nav>
      </aside>
    </>
  );
};

export default CandidateSidebar;