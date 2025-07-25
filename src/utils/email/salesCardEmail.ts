import nodemailer from "nodemailer";
import { SalesCard } from "@/types/salesCard";

/**
 * Sends two emails:
 *  1. Confirmation to the prospect (sales lead)
 *  2. Notification to the host (your own inbox)
 */
export async function sendSalesCardEmails(card: SalesCard) {
  /* ------------------ transporter ------------------ */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  /* ------------------ build bodies ------------------ */
  const userMail = {
    from: `"Sales Team" <${process.env.EMAIL_USER}>`,
    to: card.email,
    subject: "We received your enquiry!",
    html: `
      <div style="font-family:sans-serif;line-height:1.6">
        <h2>Hi there 👋</h2>
        <p>Thanks for reaching out! We’ve logged your enquiry and a sales specialist will contact you soon.</p>
        <hr/>
        <p><strong>Enquiry ID:</strong> ${card.id}</p>
        <p><strong>Your Message:</strong><br/>${card.message}</p>
        <p><strong>Phone:</strong> ${card.phone}</p>
        <hr/>
        <p>Sent ${new Date(card.createdAt).toLocaleString()}</p>
        <br/>
        <p>Best regards,<br/>Sales Team</p>
      </div>
    `,
  };

  const hostMail = {
    from: `"Sales System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🆕 Sales Enquiry #${card.id}`,
    html: `
      <div style="font-family:sans-serif;line-height:1.6">
        <h2>New SalesCard Submitted</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td><strong>ID</strong></td><td>${card.id}</td></tr>
          <tr><td><strong>Email</strong></td><td>${card.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${card.phone}</td></tr>
          <tr><td><strong>Created</strong></td><td>${card.createdAt}</td></tr>
        </table>
        <p><strong>Enquiry:</strong><br/>${card.message}</p>
      </div>
    `,
  };

  /* ------------------ send in parallel -------------- */
  try {
    await Promise.all([
      transporter.sendMail(userMail),
      transporter.sendMail(hostMail),
    ]);
    console.log("📧 SalesCard emails sent (user + host)");
    return { success: true };
  } catch (error) {
    console.error("❌ SalesCard email error:", error);
    return { success: false, error };
  }
}