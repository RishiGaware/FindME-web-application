const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from cookies
const authenticateToken = (req, res, next) => {
    console.log("inside JWTTTTTTT");

    // Access the token from the 'token' cookie
    const token = req.cookies.token;

    console.log("TOken inside Cookies ",token);
    // Check if the token exists in the cookies
    if (token) {
        // Verify the token using the secret from environment variables
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err.message);

                // Handle token expiry error specifically
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        error: 'TokenExpired',
                        message: 'Session has expired. Please log in again.'
                    });
                }

                // Handle other verification errors
                return res.status(403).json({
                    error: 'TokenVerificationFailed',
                    message: 'Invalid token. Authentication failed.'
                });
            }

            console.log("Userrrr",user);

            // Attach the user to the request object for access in the next middleware
            req.user = user;



            // Proceed to the next middleware or route handler
            next();
        });
    } else {
        // If no token is found in the cookies, send Unauthorized error
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token not found in cookies. Please log in.'
        });
    }
};

module.exports = authenticateToken;
