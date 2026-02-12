import React from "react";
import { FaUserShield, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";

const AdminProfile = () => {
  const admin = {
    name: "Admin User",
    role: "System Administrator",
    email: "admin@jobportal.com",
    phone: "+91 98765 43210",
    department: "Administration",
    joinedOn: "12 Jan 2024",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Profile</h2>

      <div style={styles.card}>
        <div style={styles.avatar}>
          <FaUserShield size={40} />
        </div>

        <h3 style={styles.name}>{admin.name}</h3>
        <p style={styles.role}>{admin.role}</p>

        <div style={styles.info}>
          <p>
            <FaEnvelope /> <span>{admin.email}</span>
          </p>
          <p>
            <FaPhone /> <span>{admin.phone}</span>
          </p>
          <p>
            <FaBriefcase /> <span>{admin.department}</span>
          </p>
          <p>
            <strong>Joined:</strong> {admin.joinedOn}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    maxWidth: "600px",
  },
  heading: {
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
  },
  name: {
    margin: "10px 0 4px",
  },
  role: {
    color: "#666",
    marginBottom: "16px",
  },
  info: {
    textAlign: "left",
    marginTop: "16px",
    lineHeight: "1.8",
  },
};

export default AdminProfile;