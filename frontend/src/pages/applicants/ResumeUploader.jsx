import { useState } from "react";
import axios from "axios";
import {
  FaFileUpload,
  FaFilePdf,
  FaSave,
  FaEye,
} from "react-icons/fa";

/**
 * ResumeUploader
 * ----------------------------
 * - View existing resume
 * - Select new resume
 * - Upload only on Save click
 */
const ResumeUploader = ({ userId, profile, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  /* ======================
     FILE SELECT
  ====================== */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError("");
  };

  /* ======================
     SAVE / UPLOAD
  ====================== */
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const res = await axios.patch(
        `${import.meta.env.VITE_APP_API}/api/candidate/resume/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSelectedFile(null);

      if (onSuccess) {
        onSuccess(res.data.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Resume upload failed"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* ================= Resume Card ================= */}
      <div className="flex items-center justify-between bg-slate-50 border rounded-xl p-4">
        <div className="flex items-center gap-3">
          <FaFilePdf className="text-red-500 text-xl" />
          <div>
            <p className="text-xs text-gray-500">Resume</p>
            <p className="text-sm font-medium">
              {profile?.resume
                ? profile.resume.fileName
                : "No resume uploaded"}
            </p>
          </div>
        </div>

        {/* View Resume */}
        {profile?.resume && (
          <a
            href={`${import.meta.env.VITE_APP_API}${profile.resume.fileUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-purple-600 hover:underline"
          >
            <FaEye /> View
          </a>
        )}
      </div>

      {/* ================= Change Resume ================= */}
      <label className="flex items-center gap-3 cursor-pointer text-sm text-purple-600 hover:underline">
        <FaFileUpload />
        {profile?.resume ? "Change Resume" : "Upload Resume"}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* ================= Save Button ================= */}
      {selectedFile && (
        <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-xl p-3">
          <p className="text-sm text-gray-700 truncate">
            Selected: <strong>{selectedFile.name}</strong>
          </p>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 disabled:opacity-60"
          >
            <FaSave />
            {isUploading ? "Saving..." : "Save Resume"}
          </button>
        </div>
      )}

      {/* ================= Error ================= */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ResumeUploader;
