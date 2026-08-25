# Guru Printing Press - Google Drive Upload Microservice

This Node.js application serves as a backend middleware to securely upload large PDF files (up to 100MB) from the Shopify storefront directly to your Google Drive account using a Service Account.

## Setup Instructions

1. **Install Dependencies:**
   Run `npm install` in this directory to install Express, Multer, and Google APIs.

2. **Google Cloud Setup (Service Account):**
   - Once you generate the Service Account JSON key from Google Cloud Console, rename the file to `service-account.json`.
   - Place `service-account.json` in the root of this folder (next to `server.js`).

3. **Google Drive Folder ID:**
   - Go to Google Drive, create a new folder (e.g. "Shopify Customer Uploads").
   - **Crucial Step:** Share this folder with the email address of your Service Account (it looks like `something@project-id.iam.gserviceaccount.com`) and give it **Editor** access.
   - Look at the URL of this folder. The long string of characters at the end is the Folder ID.
   - Copy `.env.example` to a new file named `.env` and paste your Folder ID inside `DRIVE_FOLDER_ID`.

4. **Run the Server:**
   - Run `npm start` (or `npm run dev` for auto-reloading during development).
   - The server will run on `http://localhost:3000`.

## Integration with Shopify Frontend

Once the server is running, the Shopify frontend will use JavaScript (AJAX) to send the file to `http://localhost:3000/api/upload`.
The server will respond with `{ success: true, fileUrl: 'https://drive...' }`.
Your Shopify frontend JavaScript should then inject that `fileUrl` into a hidden form input before adding the item to the cart:
`<input type="hidden" name="properties[Design File]" value="https://drive...">`
