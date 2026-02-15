import React, { useEffect } from 'react'
import { Link, Links, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import { useCookies } from 'react-cookie'
import CandidateBadge from './CandidateBadge'

const Header = () => {
    const [cookie, ,] = useCookies()

    useEffect(() => {
        document.title = "Header"
    })


    const location = useLocation()

    useEffect(() => {
        console.log(location.pathname)
    }, [])

    return (
        <>
            {/* ================= Header ================= */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/">
                        <h1 className="">
                            <img
                                src={logo}
                                alt="Veridia.io"
                                className="h-12"
                            />
                        </h1>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-8 font-medium text-sm">

                            <li>
                                <Link
                                    to="/"
                                    className={`relative text-gray-600 transition duration-300 hover:text-purple-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full ${location.pathname === "/" ? "text-purple-600 border-purple-600 border-b border-b-2" : ""}`}
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/jobs"
                                    className={`relative text-gray-600 transition duration-300 hover:text-purple-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full ${location.pathname === "/jobs" ? "text-purple-600 border-purple-600 border-b border-b-2" : ""}`}
                                >
                                    Jobs
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                     className={`relative text-gray-600 transition duration-300 hover:text-purple-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full ${location.pathname === "/about" ? "text-purple-600 border-purple-600 border-b border-b-2" : ""}`}
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                     className={`relative text-gray-600 transition duration-300 hover:text-purple-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full ${location.pathname === "/contact" ? "text-purple-600 border-purple-600 border-b border-b-2" : ""}`}
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>
                    </nav>


                    {/* Auth Buttons */}
                    {
                        cookie.user ? <CandidateBadge /> : (

                            <div className="flex items-center gap-3">
                                <Link to="/signin">
                                    <button className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition">
                                        Login
                                    </button>
                                </Link>
                                <Link to="signup">
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                </div>
            </header >

        </>
    )
}

export default Header