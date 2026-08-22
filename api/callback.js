export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  const client_secret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send("No code provided by GitHub.");
  }

  try {
    // Exchange the code for an access token
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();
    
    // Format the postMessage payload that Decap CMS expects
    const message = data.error
      ? 'authorization:github:error:' + JSON.stringify({ message: data.error_description || data.error })
      : 'authorization:github:success:' + JSON.stringify({ token: data.access_token, provider: "github" });
      
    // Return HTML that communicates with the Decap CMS parent window
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authorization complete</title>
      </head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(
                '${message}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            window.addEventListener("message", receiveMessage, false);
            // Initiate handshake with Decap CMS
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send(error.message);
  }
}
