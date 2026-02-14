import React, { Fragment, useState } from "react";
import logo from '../../assets/logo.jpeg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { showToast } from "../../components/Toast";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate= useNavigate()
    const API = import.meta.env.VITE_APP_API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const res = await axios.post(`${API}/api/signup`, formData)
            console.log(res.data)
            showToast(res.data.message)
            if(res.data.message === "Signup successful"){
                navigate("/signin")
            }
        }catch(err){
            showToast(err.message)
        }
    };

    return (
        <Fragment>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow p-6 md:p-8">

                    {/* Header */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={logo}
                            alt="Veridia.io"
                            className="h-12"
                        />
                        {/* <p className="text-gray-500 text-sm mt-1 text-center">
                            Create your account to apply for jobs
                        </p> */}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
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
                                placeholder="Enter your full name"
                                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Email */}
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

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link to="/signin">
                            <span className="text-indigo-600 font-semibold cursor-pointer">
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;
