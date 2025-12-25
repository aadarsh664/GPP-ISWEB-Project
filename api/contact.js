import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, mobile, email, company, requirement } = req.body;

  try {
    // 1. Google Sheets Setup
    // Note: GPP_CLIENT_EMAIL wo hai jo 'kaadarsh664' wale console se mila hai (service account email)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GPP_CLIENT_EMAIL,
        private_key: process.env.GPP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Data ko Google Sheet mein append karein
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GPP_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, mobile, email, company, requirement, new Date().toLocaleString()]],
      },
    });

    // 2. Email Setup (Nodemailer)
    // Note: Yahan hum 'guruprintingp@gmail.com' use karenge email bhejne ke liye
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GPP_EMAIL_USER, // guruprintingp@gmail.com
        pass: process.env.GPP_EMAIL_PASS, // guruprintingp ka App Password
      },
    });

    // Email to Owner (Aapko)
    await transporter.sendMail({
      from: process.env.GPP_EMAIL_USER,
      to: 'guruprintingp@gmail.com',
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h3>New Inquiry Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
      `,
    });

    // Thank You Email to User
    await transporter.sendMail({
      from: process.env.GPP_EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Guru Printing Press',
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out to GPP. We have received your inquiry.</p>
        <p>Our team will review your requirements and get back to you shortly.</p>
      `,
    });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}