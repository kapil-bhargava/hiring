import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import axios from "axios";
import { useCookies } from "react-cookie";
import {showToast} from "../../components/Toast";

const SignIn = () => {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API = import.meta.env.VITE_APP_API;

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // ✅ FIXED
    });
  };

  // login handler
  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/login`, formData);

      showToast(res.data.message);

      if (res.data.success) {
        console.log(res.data)
        // store userId or user object
        setCookie("user", res.data.user, { path: "/" });
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 md:p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Veridia.io" className="h-12" />
          </div>

          <h1 className="text-2xl font-semibold text-center">
            Sign In to Veridia.io
          </h1>
          <p className="text-gray-500 text-center mt-1 mb-6">
            Hiring Portal Access
          </p>

          <form onSubmit={login} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            If you are not registered, please{" "}
            <Link to="/SignUp" className="text-purple-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;