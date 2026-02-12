exports.applicationStatusTemplate = ({ name, jobTitle, status }) => {
  // Status-based configuration
  const statusConfig = {
    shortlisted: {
      color: "#16a34a", // green
      title: "Congratulations! 🎉",
      message: `
        We’re happy to inform you that you’ve been <b>shortlisted</b> for the position.
        Our hiring team will contact you shortly with the next steps.
      `,
    },
    rejected: {
      color: "#dc2626", // red
      title: "Application Update",
      message: `
        Thank you for taking the time to apply. After careful consideration,
        we will not be moving forward with your application at this time.
        <br /><br />
        We truly appreciate your interest and encourage you to apply for future openings.
      `,
    },
    pending: {
      color: "#f59e0b", // amber
      title: "Application Received",
      message: `
        Your application is currently under review.
        Our team is carefully evaluating profiles and we’ll update you once a decision is made.
      `,
    },
  };

  const current = statusConfig[status];

  return `
  <div style="background-color:#f4f7fb;padding:30px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

      <!-- Header -->
      <div style="background:#0f172a;padding:20px;text-align:center">
        <img 
          src="https://veridia.in/logo.png"
          alt="Veridia"
          style="height:40px;margin-bottom:10px"
        />
        <h2 style="color:#ffffff;margin:0;font-weight:500">
          Application Status Update
        </h2>
      </div>

      <!-- Body -->
      <div style="padding:30px;color:#334155">
        <h3 style="margin-top:0;color:#0f172a">
          ${current.title}
        </h3>

        <p>Hello <b>${name}</b>,</p>

        <p>
          This is an update regarding your application for the role of
          <b>${jobTitle}</b>.
        </p>

        <div style="
          margin:20px 0;
          padding:15px;
          border-left:5px solid ${current.color};
          background:#f8fafc;
        ">
          <p style="margin:0">
            <b>Status:</b>
            <span style="color:${current.color};font-weight:bold">
              ${status.toUpperCase()}
            </span>
          </p>
        </div>

        <p>
          ${current.message}
        </p>

        <p style="margin-top:30px">
          Best wishes,<br />
          <b>Veridia Hiring Team</b>
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background:#f1f5f9;
        padding:15px;
        text-align:center;
        font-size:12px;
        color:#64748b
      ">
        © ${new Date().getFullYear()} Veridia. All rights reserved.
      </div>

    </div>
  </div>
  `;
};
