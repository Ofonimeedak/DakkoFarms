const { google } = require("googleapis");
const authUser = require("../Model/googlModel");
require("dotenv").config();

// The scopes define what access your app is requesting

// Step 1: Redirect user to Google’s OAuth 2.0 server
exports.login = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const SCOPES = [
    "openid",
    "email",
    "profile",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
  res.redirect(authUrl);
};

// Step 2: Google redirects back with a code
exports.redirect = async (req, res) => {
  const code = req.query.code;

  const oauth2Client = new google.auth.OAuth2(
     process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info from Google
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    // Check if user already exists in DB
    let user = await authUser.findOne({ googleId: data.id });

    if (!user) {
      // Create new user if not found
      user = new authUser({
        googleId: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      });
    } else {
      // Update tokens if user exists
      user.accessToken = tokens.access_token;
      user.refreshToken = tokens.refresh_token || user.refreshToken; // keep old one if new not given
      user.tokenExpiry = tokens.expiry_date
        ? new Date(tokens.expiry_date)
        : null;
    }

    await user.save();

    res.send(`
      <h1>Welcome, ${user.name}!</h1>
      <p>Email: ${user.email}</p>
      <img src="${user.picture}" />
    `);
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).send("Authentication failed");
  }
};
