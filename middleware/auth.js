const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secret); // Verify the token
        req.user = decoded; // Attach user payload (id, role) to the request object
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

// Middleware for role-based access
const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Insufficient permissions.",
        });
    }
    next();
};

module.exports = { authenticate, authorize };