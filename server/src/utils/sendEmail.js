import nodemailer from "nodemailer";

const sendEmail = async (to, subject, content) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "test",
    port: process.env.SMTP_PORT || 500,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "test",
      pass: process.env.SMTP_PASS || "test",
    },
  });

  await transport.sendMail({
    from: "cruceanuandrei10@gmail.com",
    to: to,
    subject: subject,
    html: content,
  });
};

export { sendEmail };
