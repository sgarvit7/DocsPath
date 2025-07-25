// lib/email/sendContactEmail.ts
import nodemailer from "nodemailer";

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, subject, message } = data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // "ankbtg@gmail.com"
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  // Confirmation email to the user
  const userMail = {
    from: `"Docspath Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for contacting us – ${subject}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out. We’ve received your message and will get back to you soon.</p>
        <hr />
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr />
        <p>We'll contact you at: <strong>${phone}</strong> or <strong>${email}</strong></p>
        <br/>
        <p>Best regards,<br/>Docspath Team</p>
      </div>
    `,
  };

  // Notification email to the host
  const hostMail = {
    from: `"Docspath System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📩 New Contact Form Submission: ${subject}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr />
        <p>Sent at ${new Date().toLocaleString()}</p>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMail),
      transporter.sendMail(hostMail),
    ]);

    console.log("✅ Emails sent to user and host.");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    return { success: false, error };
  }
}