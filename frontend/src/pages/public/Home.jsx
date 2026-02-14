import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import int from "../../assets/int.png";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= HERO ================= */}
      <main className="flex-grow">

        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Build Your Future with{" "}
              <span className="bg-gradient-to-r from-[#9810FA] to-purple-600 bg-clip-text text-transparent">
                Veridia
              </span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg">
              Discover exciting career opportunities in a transparent and
              structured hiring process. Veridia helps you apply, track,
              and grow with confidence.
            </p>

            <p className="mt-4 text-gray-500">
              Our platform ensures a smooth candidate experience with real-time
              updates and fast communication with hiring teams.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/jobs">
                <button className="px-7 py-3 bg-[#9810FA] text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition">
                  Explore Jobs
                </button>
              </Link>

              <button className="px-7 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#9810FA] font-semibold">✔ Transparent Hiring</p>
                <p className="text-gray-500">Fair and clear evaluation</p>
              </div>
              <div>
                <p className="text-[#9810FA] font-semibold">✔ Real-time Updates</p>
                <p className="text-gray-500">Track every stage</p>
              </div>
              <div>
                <p className="text-[#9810FA] font-semibold">✔ Fast Process</p>
                <p className="text-gray-500">Quick recruiter responses</p>
              </div>
              <div>
                <p className="text-[#9810FA] font-semibold">✔ Career Growth</p>
                <p className="text-gray-500">Learn and grow with us</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9810FA] to-purple-500 rounded-2xl blur-2xl opacity-20"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-4">
                <img
                  src={int}
                  alt="Veridia Careers"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <h3 className="text-3xl font-bold text-gray-900">
              How Veridia Works
            </h3>
            <p className="mt-4 text-gray-600">
              A simple and seamless hiring experience designed for modern
              professionals.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-8">

              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="text-[#9810FA] font-semibold text-lg">
                  1. Explore Opportunities
                </h4>
                <p className="mt-2 text-gray-500">
                  Browse roles that match your skills and interests.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="text-[#9810FA] font-semibold text-lg">
                  2. Apply Easily
                </h4>
                <p className="mt-2 text-gray-500">
                  Submit your application with a smooth and fast process.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="text-[#9810FA] font-semibold text-lg">
                  3. Track & Grow
                </h4>
                <p className="mt-2 text-gray-500">
                  Stay updated and grow your career with Veridia.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= WHY VERIDIA ================= */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                Why Choose Veridia?
              </h3>

              <p className="mt-6 text-gray-600">
                We believe hiring should be transparent, fair, and
                candidate-friendly. Our platform is built to empower
                professionals with clarity and confidence.
              </p>

              <ul className="mt-6 space-y-3 text-gray-500">
                <li>✔ Structured and unbiased hiring</li>
                <li>✔ Transparent communication</li>
                <li>✔ Fast decision-making</li>
                <li>✔ Real-time updates</li>
                <li>✔ Career-focused culture</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-2xl p-10 shadow-xl">
              <h4 className="text-2xl font-semibold">
                Join Our Growing Talent Community
              </h4>
              <p className="mt-4 text-purple-100">
                Stay connected and get notified about new job opportunities
                and career updates.
              </p>

              <Link to="/jobs">
                <button className="mt-6 bg-white text-[#9810FA] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Start Your Journey
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
