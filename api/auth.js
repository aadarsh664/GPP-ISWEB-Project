export default function handler(req, res) {
  // GitHub OAuth client ID from Vercel Environment Variables
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  
  if (!client_id) {
    return res.status(500).json({ error: "OAUTH_GITHUB_CLIENT_ID is not configured in Vercel." });
  }

  // Generate random state for CSRF protection
  const state = Math.random().toString(36).substring(7);
  
  // Decap CMS requires 'repo' and 'user' scopes
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&state=${state}`;
  
  // Redirect user to GitHub login
  res.redirect(authUrl);
}
