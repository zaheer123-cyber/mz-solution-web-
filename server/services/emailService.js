import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass }
    });
  }
  return transporter;
};

export const sendInquiryNotification = async (inquiry) => {
  try {
    const mailer = getTransporter();
    const recipient = process.env.NOTIFICATION_RECEIVER_EMAIL || process.env.SMTP_USER || 'admin@mzsolution.com';

    if (!mailer) {
      console.log(`📧 [Notification Log] New Inquiry received from ${inquiry.name} (${inquiry.email}) for service "${inquiry.service}". (SMTP not configured, logged to console)`);
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || '"MzSolution Inquiries" <no-reply@mzsolution.com>',
      to: recipient,
      subject: `New Project Inquiry: ${inquiry.name} - ${inquiry.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0d12; color: #ffffff; padding: 24px; border-radius: 8px;">
          <h2 style="color: #4f8cff; margin-top: 0;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Client Name:</strong></td><td style="color: #f8fafc;">${inquiry.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Email:</strong></td><td style="color: #f8fafc;"><a href="mailto:${inquiry.email}" style="color: #4f8cff;">${inquiry.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Company:</strong></td><td style="color: #f8fafc;">${inquiry.company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Service Required:</strong></td><td style="color: #f8fafc;">${inquiry.service}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;"><strong>Budget:</strong></td><td style="color: #f8fafc;">${inquiry.budget || 'Unspecified'}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #141821; border-radius: 6px; border: 1px solid #1f2638;">
            <p style="margin: 0; color: #94a3b8; font-size: 13px;">Project Details:</p>
            <p style="margin-top: 8px; color: #f8fafc; white-space: pre-line;">${inquiry.message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #64748b;">This notification was generated automatically by MzSolution Website System.</p>
        </div>
      `
    };

    await mailer.sendMail(mailOptions);
    console.log(`✅ Inquiry email notification sent to ${recipient}`);
  } catch (error) {
    console.error('⚠️ Failed to send inquiry notification email:', error.message);
  }
};
