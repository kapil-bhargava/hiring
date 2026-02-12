// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import Jobs from './pages/public/Jobs'
import PublicLayout from './layouts/publiclayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './layouts/AdminLayout'
import ApplicantsList from './pages/admin/ApplicantsList'
import SignIn from './pages/public/Signin'
import JobPosting from './pages/admin/JobPosting'
import Shortlisted from './pages/admin/Shortlisted'
import Interview from './pages/admin/Interview'
import JobApply from './pages/public/JobApply'
import SignUp from './pages/public/Signup'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import SignUpTable from './pages/admin/SignUptable'
import JobPostingForm from './pages/admin/JobForm'
import ApplicantLayout from './layouts/ApplicantLayout'
import CandidateDashboard from './pages/applicants/CandidateDashboard'
import CandidateSidebar from './components/applicants/Cndidatesidebar'
import BrowseJobs from './pages/applicants/BrowseJobs'
import Profile from './pages/applicants/Profile'
import EditProfile from './components/applicants/EditProfile'
import CandidateBadge from './components/public/CandidateBadge'
import Login from './pages/admin/Login'
import AppliedJobs from './pages/applicants/Applied-Jobs'
import SavedJobs from './pages/applicants/Save-Jobs'
import CandidateSettings from './pages/applicants/CandidateSettings'
import CandidateInterviews from './pages/applicants/CndidateInterview'
import Toast from './components/toast'
import Rejectedlisted from './pages/admin/Rejected'
import AdminProfile from './pages/admin/AdminProfile'
function App() {

  return (
    <>
        <Toast/>
      <Routes>

        {/* =================for the public section =================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobapply" element={<JobApply />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>No ppage</h1>} />
        </Route>

        {/* ============== for the Cndidate section============ */}
        <Route path='/candidate' element={<ApplicantLayout />}>
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path='browse-jobs' element={<BrowseJobs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='editprofile' element={<EditProfile />} />
          <Route path='applied-jobs' element={<AppliedJobs />} />
          <Route path='saved-jobs' element={<SavedJobs />} />
          <Route path='settings' element={<CandidateSettings />} />
          <Route path='interviews' element={<CandidateInterviews />} />
          <Route path="*" element={<h1>No ppage</h1>} />
        </Route>
        <Route path="bb" element={<CandidateBadge />} />


        {/* ==============for the admin section ====================*/}

        <Route path='/admin' element={<AdminLayout />}>
          <Route path="applicationtable" element={<ApplicantsList />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="jobposting" element={<JobPosting />} />
          <Route path="shortlisted" element={<Shortlisted />} />
          <Route path="rejected" element={<Rejectedlisted />} />
          <Route path="interview" element={<Interview />} />
          <Route path="usersign" element={<SignUpTable />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="*" element={<h1>No ppage</h1>} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
      </Routes >
    </>
  )
}

export default App
