const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    secure: true,
});


const sendMail = async ({ to, subject, html }) => {
    console.log("📧 Mail response:", subject);
    try {
        await transporter.sendMail({
            from: `"Veridia Jobs" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error("Email send error:", error);
    }
};

module.exports = sendMail;
