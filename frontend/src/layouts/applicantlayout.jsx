import React, { useState } from 'react'
import CandidateSidebar from '../components/applicants/Cndidatesidebar'
import { Outlet } from 'react-router-dom'
import CandidateBadge from '../components/public/CandidateBadge';

function ApplicantLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <div className='flex'>
        <CandidateSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className='flex-1 md:ml-64'>
          <header className="sticky top-0 flex z-5 items-center justify-between bg-white px-6 py-4 shadow">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className=" text-purple-600 md:hidden text-xl font-bold text-gray-700"
            >
              ☰
            </button>

            <h1 className="text-xl font-semibold">Candidate Panel</h1>

            {/* <span className="text-gray-600">Welcome, User</span> */}
            <CandidateBadge />
          </header>

          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ApplicantLayout