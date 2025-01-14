const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET;

// User model logic
const User = {
    findByUsername: async (username) => {
        const query = 'SELECT * FROM Users WHERE email = ?';

        try {
            const [rows] = await db.query(query, [username]); // Use `db.query` with async/await
            return rows.length > 0 ? rows[0] : null; // Return the first user or null if not found
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    },
};

// Generate JWT Token
exports.getToken = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("body", req.body);

        // Find user by username (email)
        const user = await User.findByUsername(email);

        if (!user) {
            return res.status(404).send('No user found.');
        }

        // Verify password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null, message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: 86400 }); // Token valid for 24 hours

        // Send response
        res.status(200).send({ accessToken:token });
    } catch (error) {
        console.error('Error in getToken:', error.message);
        res.status(500).send({ auth: false, message: 'Error on the server', error: error.message });
    }
};

// Refresh JWT Token
exports.refreshToken = async (req, res) => {
    const { authorizationToken } = req.body;

    // Check if token is provided
    if (!authorizationToken) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    try {
        // Verify the provided token
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(authorizationToken, secret, (err, payload) => {
                if (err) reject(err);
                else resolve(payload);
            });
        });

        // Generate a new token
        const token = jwt.sign({ id: decoded.id, role: decoded.role }, secret, { expiresIn: 86400 }); // Token valid for 24 hours

        res.status(200).send({ refreshToken:token });
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        res.status(401).send({ auth: false, message: 'Failed to authenticate token.', error: error.message });
    }
};
