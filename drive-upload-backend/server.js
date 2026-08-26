require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so Shopify storefront can hit this endpoint
app.use(cors({
  origin: ['https://shop.guruprintingpress.com', 'https://guruprintingpress.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure Multer for file uploads (storing temporarily on disk before sending to Drive)
// Vercel Serverless Functions only allow write access to /tmp/
const upload = multer({
  dest: '/tmp/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (NOTE: Vercel has a hard 4.5MB request body limit)
  }
});

// Configure Google Drive API Client using OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.DRIVE_CLIENT_ID,
  process.env.DRIVE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Standard redirect URI for this flow
);

oauth2Client.setCredentials({
  refresh_token: process.env.DRIVE_REFRESH_TOKEN
});

const auth = oauth2Client;
const driveService = google.drive({ version: 'v3', auth });

/**
 * Endpoint to handle file uploads
 */
app.post('/api/upload', upload.single('designFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { path: tempPath, originalname, mimetype } = req.file;

    // Optional: Only allow PDF, AI, CDR
    // if (!['application/pdf', 'application/postscript'].includes(mimetype)) { ... }

    // Upload to Google Drive
    const driveResponse = await driveService.files.create({
      requestBody: {
        name: `${Date.now()}_${originalname}`,
        parents: process.env.DRIVE_FOLDER_ID ? [process.env.DRIVE_FOLDER_ID] : [], // Ensure the Service Account has 'Editor' access to this folder
      },
      media: {
        mimeType: mimetype,
        body: fs.createReadStream(tempPath),
      },
      fields: 'id, webViewLink',
    });

    const fileId = driveResponse.data.id;
    const fileUrl = driveResponse.data.webViewLink;

    // Optional: Give public "Anyone with link can view" permission so you can open it easily without logging in
    // Note: It's safer to just share the folder with your personal Google account in Drive, so only you can see it.
    await driveService.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      }
    });

    // Delete the temporary file from local disk
    fs.unlinkSync(tempPath);

    return res.status(200).json({
      success: true,
      fileId: fileId,
      fileUrl: fileUrl,
      message: 'File uploaded successfully to Google Drive',
    });

  } catch (error) {
    console.error('Upload Error:', error);
    
    // Attempt cleanup if something failed
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    return res.status(500).json({ error: 'Failed to upload file to Google Drive.' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Guru Printing Press - Drive Upload Microservice Running.');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
