// middleware/auth.js
const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth client with your Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function authMiddleware(req, res, next) {
  try {
    // Look for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    const token = parts[1];

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // must match your Google OAuth client ID
    });

    // Attach user info to request for downstream use
    req.user = ticket.getPayload();

    // Allow request to continue
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
