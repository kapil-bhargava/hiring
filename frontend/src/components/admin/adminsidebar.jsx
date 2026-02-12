import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBriefcase,
  FaUserCheck,
  FaCalendarAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useCookies } from "react-cookie";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const [cookie, ,] = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookie.admin) {
      navigate("/admin/login")
    }
  }, [])

  useEffect(() => {
    document.title = "Admin Sidebar"
  })


  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 bg-purple-600 text-white w-64 min-h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-purple-500">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-1">

          <SidebarItem to="/admin/dashboard" icon={<FaTachometerAlt />} label="Dashboard" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/jobposting" icon={<FaBriefcase />} label="Job Postings" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/applicationtable" icon={<FaUsers />} label="Applicants" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/shortlisted" icon={<FaUserCheck />} label="Shortlisted" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/rejected" icon={<FaUserCheck />} label="Rejected" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/interview" icon={<FaCalendarAlt />} label="Interviews" setIsOpen={setIsOpen} />
          <SidebarItem to="/admin/usersign" icon={<FaUserPlus />} label="Create User" setIsOpen={setIsOpen} />

        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ to, icon, label, setIsOpen }) => {
  return (
    <NavLink
      to={to}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-4 px-5 py-3 mx-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${isActive ? "bg-purple-700" : "hover:bg-purple-700"}`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default AdminSidebar;
