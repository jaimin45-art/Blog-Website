// email-service.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
} from "./email-template.js";

dotenv.config();

// ✅ Gmail transporter setup with TLS fix for development
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your gmail address
    pass: process.env.GMAIL_PASS, // your Google App Password
  },
  tls: {
    rejectUnauthorized: false, // ✅ fix for "self-signed certificate" error
  },
});

// ✅ Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken),
    });
    console.log("✅ Verification email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

// ✅ Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
    console.log("✅ Welcome email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

// ✅ Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `Click <a href="${resetURL}">here</a> to reset your password.`,
    });
    console.log("✅ Password reset email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
  }
};

// ✅ Send Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successful",
      html: `Your password has been successfully reset.`,
    });
    console.log("✅ Reset success email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending reset success email:", error);
  }
};
