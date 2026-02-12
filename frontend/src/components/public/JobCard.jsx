import React, { useEffect, useState } from "react";
import Header from "../../components/public/header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/toast";
import axios from "axios";

const JobCard = () => {

    const [cookies] = useCookies();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const API = import.meta.env.VITE_APP_API;

    /* ----------------------------------
       FETCH ALL JOBS (PUBLIC)
    ---------------------------------- */
    const getJobs = async () => {
        try {
            const res = await axios.get(`${API}/api/job`);
            setJobs(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    /* ----------------------------------
       FETCH USER APPLICATIONS (PRIVATE)
    ---------------------------------- */
    const getMyApplications = async () => {
        if (!cookies.user) return;

        try {
            const candidateId = cookies.user._id;
            const res = await axios.get(`${API}/api/applications/${candidateId}`);
            setApplications(res.data.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    /* ----------------------------------
       APPLY JOB HANDLER
    ---------------------------------- */
    const handleApplyJob = async (jobId) => {
        if (!cookies.user) {
            showToast("Please login first to apply");
            return;
        }

        try {
            setLoader(true);
            const res = await axios.post(`${API}/api/apply`, {
                jobId,
                candidateId: cookies.user._id,
            });

            if (res.data?.success === false) {
                const { message } = res.data;
                showToast(message);

                setTimeout(() => {
                    if (
                        message === "Please create your profile" ||
                        message === "Please upload your resume before applying"
                    ) {
                        navigate("/candidate/profile");
                    }
                }, 1000);

                setLoader(false);
                return;
            }

            // ✅ SUCCESS
            setLoader(false);
            showToast(`${res.data.message} • Track it from Dashboard`);

            // 🔁 Update applied jobs instantly (UX)
            setApplications((prev) => [
                ...prev,
                { jobId: { _id: jobId } },
            ]);
        } catch (error) {
            const message =
                error.response?.data?.message || "Something went wrong";

            if (
                message === "Please create your profile" ||
                message === "Resume not uploaded" ||
                message === "Please complete your profile"
            ) {
                setTimeout(() => {
                    navigate("/candidate/profile");
                }, 1000);
            }

            setLoader(false);
        }
    };

    /* ----------------------------------
       SIDE EFFECTS
    ---------------------------------- */
    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        if (cookies.user) {
            getMyApplications();
        }
    }, [cookies.user]);

    useEffect(() => {
        document.title = "Jobs";
    }, []);

    /* ----------------------------------
       CREATE APPLIED JOB ID ARRAY
    ---------------------------------- */
    const appliedJobIds = applications
        .filter((app) => app.jobId?._id)
        .map((app) => app.jobId._id);


    return (
        <>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => {
                    const hasApplied =
                        cookies.user && appliedJobIds.includes(job._id);

                    return (
                        <div
                            key={job._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">
                                {job.title}
                            </h3>

                            <div className="mt-3 space-y-2 text-sm text-gray-600">
                                <p><b>Location:</b> {job.location}</p>
                                <p><b>Job Type:</b> {job.jobType}</p>
                                <p><b>Experience:</b> {job.experience}</p>
                                <p><b>Salary:</b> {job.salary}</p>
                            </div>

                            <p className="mt-4 text-gray-600 text-sm line-clamp-3">
                                {job.description}
                            </p>

                            {/* Action */}
                            <div className="mt-auto pt-6">
                                <button
                                    onClick={() => handleApplyJob(job._id)}
                                    disabled={hasApplied}
                                    className={`w-full px-4 py-2 rounded text-white
                      ${hasApplied
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700"
                                        }`}
                                >
                                    {hasApplied ? "Applied" : "Apply Now"}
                                </button>

                                {/* Micro dashboard hint */}
                                {cookies.user && !hasApplied && (
                                    <p
                                        onClick={() =>
                                            navigate("/candidate/applications")
                                        }
                                        className="mt-2 text-xs text-gray-500 text-center cursor-pointer hover:underline"
                                    >
                                        Manage applications in Dashboard →
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Loader */}
            {loader && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-gray-800 font-medium">Applying...</p>
                    </div>
                </div>
            )}
            {/* </section > */}
        </>
    )
}

export default JobCard