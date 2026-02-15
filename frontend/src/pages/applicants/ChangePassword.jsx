


import React, { useRef, useState } from "react";

const ChangePassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputsRef = useRef([]);

    /* ================= OTP HANDLER ================= */

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move next
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    /* ================= SUBMIT ================= */

    const sendOtp = () => {
        console.log("Send OTP to:", email);
        setStep(2);
    };

    const verifyOtp = () => {
        console.log("OTP:", otp.join(""));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4ebff] to-white">

            {/* ================= STEP 1 ================= */}
            {step === 1 && (
                <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] border">

                    <h2 className="text-xl font-semibold text-center text-gray-800">
                        Forgot Password
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-2">
                        Enter your registered email to receive OTP
                    </p>

                    <input
                        type="email"
                        placeholder="Registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-6 border rounded-lg p-3 focus:ring-2 focus:ring-[#9810FA] outline-none"
                    />

                    <button
                        onClick={sendOtp}
                        className="w-full mt-5 bg-[#9810FA] hover:bg-purple-700 text-white py-2.5 rounded-lg transition"
                    >
                        Send OTP
                    </button>
                </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
                <div className="bg-white p-8 rounded-2xl shadow-xl w-[420px] border">

                    <h2 className="text-xl font-semibold text-center text-gray-800">
                        Verify OTP
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-2">
                        Enter the 6-digit OTP sent to your email
                    </p>

                    {/* OTP BOX */}
                    <div className="flex justify-between mt-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-[#9810FA] outline-none"
                            />
                        ))}
                    </div>

                    {/* RESEND */}
                    <div className="text-center mt-4">
                        <button className="text-sm text-[#9810FA] hover:underline">
                            Resend OTP
                        </button>
                    </div>

                    <button
                        onClick={verifyOtp}
                        className="w-full mt-5 bg-[#9810FA] hover:bg-purple-700 text-white py-2.5 rounded-lg"
                    >
                        Verify OTP
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
