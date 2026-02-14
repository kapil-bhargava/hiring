const link = "https://drive.usercontent.google.com/download?id=1kuotwt3OgVB5wLr-nn54OPOJotQvfTEl&export=view&authuser=0";
exports.applicationStatusTemplate = ({ name, jobTitle, status }) => {
  // Status-based configuration
  const statusConfig = {
    shortlisted: {
      color: "#16a34a", // green
      title: "You’re Shortlisted!",
      message: `
      <b>Congratulations!</b> Your profile has been <span style="color:#16a34a; font-weight:600;">successfully shortlisted</span> for this opportunity at <b>Veridia</b>.
      <br /><br />
      Our hiring team will reach out to you soon to discuss the <b>next steps</b> in the selection process.
      <br /><br />
      Thank you for your interest in growing your career with us.
    `,
    },

    rejected: {
      color: "#dc2626", // red
      title: "Application Update from Veridia",
      message: `
      Thank you for your interest in <b>Veridia</b> and for taking the time to apply.
      After careful review, we will <span style="color:#dc2626; font-weight:600;">not be moving forward</span> with your application at this stage.
      <br /><br />
      We truly appreciate your effort and encourage you to apply for <b>future opportunities</b> with us.
      <br /><br />
      We wish you continued success in your career journey.
    `,
    },

    pending: {
      color: "#f59e0b", // amber
      title: "Your Application is Under Review",
      message: `
      Thank you for applying to <b>Veridia</b>. Your application is currently 
      <span style="color:#f59e0b; font-weight:600;">under review</span> by our hiring team.
      <br /><br />
      We are carefully evaluating profiles and will update you once a decision is made.
      <br /><br />
      We appreciate your patience and interest in working with us.
    `,
    },
  };



  const current = statusConfig[status];

  return `
  <div style="background-color:#f4f7fb;padding:30px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

       <!-- Header -->
      <div style="
        background:#f0f0ff;
        padding:20px;
        text-align:center;
        border-top:4px solid #4f46e5;
        border-image: linear-gradient(90deg, #4f46e5, #2563eb) 1;
      ">
      
        <!-- Logo -->
        <img 
          src="${link}"
          alt="Veridia"
          style="height:42px; margin-bottom:10px; display:block; margin-left:auto; margin-right:auto;"
        />
      
        <!-- Heading -->
        <h2 style="
          color:#111827;
          margin:0;
          font-weight:600;
          font-family: Arial, sans-serif;
        ">
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
