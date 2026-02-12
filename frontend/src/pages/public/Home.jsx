import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import int from '../../assets/int.png'

const Home = () => {


  useEffect(()=>{
      document.title = "Home"
    })


  return (
    <div className="min-h-screen flex flex-col bg-white">


      {/* ================= Hero Section ================= */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Build Your Career with{" "}
              <span className="text-purple-600">Veridia</span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg">
              Apply for exciting opportunities at Veridia through a simple and
              structured hiring process. Track your application status and stay
              informed at every stage.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/jobs">
                <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition">
                  Explore Jobs
                </button>
              </Link>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Visual Section */}
          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-md h-72 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 font-semibold">
             <img className="w-[100%] h-100%" src={int} alt="" />
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default Home;
