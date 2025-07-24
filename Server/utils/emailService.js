const nodemailer = require('nodemailer');

// Create transporter with multiple service options
const createTransporter = () => {
  // Gmail configuration (primary)
  if (process.env.EMAIL_SERVICE === 'gmail' || !process.env.EMAIL_SERVICE) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  // Outlook/Hotmail configuration
  if (process.env.EMAIL_SERVICE === 'outlook') {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  // Custom SMTP configuration
  if (process.env.EMAIL_SERVICE === 'smtp') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  // Default to Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const transporter = createTransporter();

const sendVerificationOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your NextEra account - OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Welcome to NextEra!</h1>
        <p style="font-size: 16px; color: #555;">Thank you for registering with us. Please use the following OTP code to verify your email address:</p>
        
        <div style="background-color: #f8f9fa; border: 2px dashed #007bff; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h2 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h2>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          • This OTP is valid for <strong>10 minutes</strong><br>
          • Do not share this code with anyone<br>
          • If you didn't request this, please ignore this email
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          This is an automated email from NextEra. Please do not reply to this email.
        </p>
      </div>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  // Log the URL being generated for debugging
  console.log('Password reset URL generated:', resetUrl);
  console.log('CLIENT_URL from env:', process.env.CLIENT_URL);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset your NextEra password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>You requested to reset your password for your NextEra account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Reset My Password
          </a>
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #856404;">
            <strong>📱 Mobile Users:</strong><br>
            If you're on mobile and the link doesn't work, please open this email on your computer or ensure you're connected to the same network as the development server.
          </p>
        </div>
        
        <p><strong>⏰ This link will expire in 1 hour.</strong></p>
        <p>🔒 If you didn't request this, please ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          This is an automated email from NextEra. Please do not reply to this email.
        </p>
      </div>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', result.messageId);
    console.log('Reset URL sent to user:', resetUrl);
    return result;
  } catch (error) {
    console.error('Password reset email sending failed:', error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

module.exports = {
  sendVerificationOTP,
  sendPasswordResetEmail
};