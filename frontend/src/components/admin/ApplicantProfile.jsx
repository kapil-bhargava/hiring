import {
  Mail,
  Phone,
  MapPin,
  Download,
  Briefcase,
  GraduationCap,
  X,
} from "lucide-react";

const ApplicantProfile = ({ candidate, onClose }) => {
  if (!candidate) return null;

  const {
    userId,
    phone,
    location,
    education,
    experience,
    skills,
    resume,
    profilePic,
  } = candidate;

  return (
    /* ================= Overlay ================= */
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      {/* ================= Modal ================= */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* ================= Header ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            {profilePic?.fileUrl ? (
              <img
                // src={profilePic.fileUrl}
                src={import.meta.env.VITE_APP_API + profilePic.fileUrl}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white 
                flex items-center justify-center text-lg font-bold">
                {userId?.name?.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {userId?.name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail size={14} /> {userId?.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= Body ================= */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem icon={<Phone size={16} />} label="Phone" value={phone || "—"} />
            <InfoItem icon={<MapPin size={16} />} label="Location" value={location || "—"} />
          </div>

          {/* Education */}
          <Card title="Education" icon={<GraduationCap size={18} />}>
            {education?.degree ? (
              <>
                <p className="font-medium">{education.degree}</p>
                <p className="text-gray-600 text-sm">{education.university}</p>
                <p className="text-xs text-gray-500">
                  {education.startYear} – {education.endYear}
                </p>
              </>
            ) : (
              <EmptyText />
            )}
          </Card>

          {/* Experience */}
          <Card title="Experience" icon={<Briefcase size={18} />}>
            {experience?.role ? (
              <>
                <p className="font-medium">{experience.role}</p>
                <p className="text-gray-600 text-sm">{experience.company}</p>
                <p className="text-xs text-gray-500">
                  {experience.startDate} – {experience.endDate || "Present"}
                </p>
              </>
            ) : (
              <EmptyText />
            )}
          </Card>

          {/* Skills */}
          <Card title="Skills">
            {skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium 
                    bg-indigo-100 text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyText />
            )}
          </Card>

          {/* Resume */}
          <Card title="Resume">
            {resume?.fileUrl ? (
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline"
              >
                <Download size={16} />
                {resume.fileName || "Download Resume"}
              </a>
            ) : (
              <EmptyText />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ================= Reusable UI ================= */

const Card = ({ title, icon, children }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold text-sm">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
    <div className="text-indigo-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  </div>
);

const EmptyText = () => (
  <p className="text-sm text-gray-400 italic">Not provided</p>
);



export default ApplicantProfile;
