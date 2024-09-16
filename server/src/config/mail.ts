import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  export const sendEmail = async(to:string, subject:string, body:string) => {
    await transporter.sendMail({
        from: process.env.FROM_EMAIL, 
        to: to,
        subject: subject, 
        html: body,
      });
  }