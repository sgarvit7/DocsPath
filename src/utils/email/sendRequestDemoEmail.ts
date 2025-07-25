import nodemailer from "nodemailer";
import { RequestDemo } from "@/types/requestDemo";

export async function sendRequestDemoEmails(data: RequestDemo) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userMail = {
    from: `"Demo Team" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: "We've received your demo request!",
    html: `
      <div style="font-family:sans-serif;line-height:1.5">
        <h2>Hello ${data.fullName},</h2>
        <p>Thank you for requesting a demo. We’ll reach out to you soon!</p>
        <hr/>
        <p><strong>Your Info:</strong></p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Organization:</strong> ${data.org ?? "N/A"}</p>
        <p><strong>Notes:</strong><br/>${data.notes ?? "None"}</p>
        <hr/>
        <p>Requested on: ${new Date(data.createdAt).toLocaleString()}</p>
        <br/>
        <p>— The Demo Team</p>
      </div>
    `,
  };

  const hostMail = {
    from: `"Demo Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📩 New Demo Request from ${data.fullName}`,
    html: `
      <div style="font-family:sans-serif;line-height:1.5">
        <h2>New Demo Request</h2>
        <ul>
          <li><strong>Name:</strong> ${data.fullName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Role:</strong> ${data.role}</li>
          <li><strong>Org:</strong> ${data.org ?? "N/A"}</li>
          <li><strong>Notes:</strong> ${data.notes ?? "None"}</li>
          <li><strong>Submitted:</strong> ${new Date(data.createdAt).toLocaleString()}</li>
        </ul>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMail),
      transporter.sendMail(hostMail),
    ]);
    console.log("✅ Demo request emails sent");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending demo emails:", error);
    return { success: false, error };
  }
}
