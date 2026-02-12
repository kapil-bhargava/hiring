import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaSearch,
  FaBriefcase,
  FaBookmark,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CandidateSidebar = ({ isOpen, setIsOpen }) => {
  const [cookie, , removecookie] = useCookies()
  const navigate = useNavigate()

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/candidate/dashboard" },
    { name: "Browse Jobs", icon: <FaSearch />, path: "/candidate/browse-jobs" },
    { name: "Applied Jobs", icon: <FaBriefcase />, path: "/candidate/applied-jobs" },
    { name: "Saved Jobs", icon: <FaBookmark />, path: "/candidate/saved-jobs" },
    { name: "Interviews", icon: <FaCalendarAlt />, path: "/candidate/interviews" },
    { name: "Profile", icon: <FaUser />, path: "/candidate/profile" },
    { name: "Settings", icon: <FaCog />, path: "/candidate/settings" },
  ];

  useEffect(() => {
    if (!cookie.user) {
      navigate("/signin")
    }
    // else{
      
    // }
  }, [])


  useEffect(() => {
    document.title = "Candidate Sidebar"
  })

  return (
    <>


      {/* Mobile Top Bar */}
      {/* <div className="md:hidden flex items-center justify-between bg-purple-600 text-white p-4">
        <h2 className="text-lg font-semibold">Candidate Panel</h2>
        <button onClick={() => setOpen(true)}>
          <FaBars size={22} />
        </button>
      </div> */}

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
        <div className=" bg-purple-600 text-white p-3 text-center">
          <h2 className="text-lgfont-semibold">Candidate Panel</h2>
          <span className="text-sm text-gray-300">{cookie.user ? cookie.user.name : "null"}</span>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>


        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg
                 text-gray-700 hover:bg-purple-100 hover:text-purple-600
                 transition font-medium"
              onClick={() => {
                setIsOpen(false); if (item.name === "Logout") {
                  removecookie("user");
                  navigate("/signin")
                }
              }}
            >
              <span className="text-lg text-purple-600">
                {item.icon}
              </span>
              <span className="text-sm">
                {item.name}
              </span>
            </Link>
          ))}
          {/* Logout button  */}
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg
                 text-gray-700 hover:bg-purple-100 hover:text-purple-600
                 transition font-medium cursor-pointer"
            onClick={() => {
              removecookie("user");
              navigate("/signin")
            }}
          >
            <span className="text-lg text-purple-600">
              <FaSignOutAlt />
            </span>
            <span className="text-sm">
              Logout
            </span>
          </button>
        </nav>


      </aside>
    </>
  );
};

export default CandidateSidebar;
