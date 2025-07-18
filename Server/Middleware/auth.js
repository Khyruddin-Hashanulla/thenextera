const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Ensure JWT_SECRET has a fallback value
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'Authentication required' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('Token verified:', {
                userId: decoded.id,
                role: decoded.role,
                exp: new Date(decoded.exp * 1000).toISOString()
            });

            const user = await User.findById(decoded.id);
            if (!user) {
                console.log('User not found for ID:', decoded.id);
                return res.status(401).json({ error: 'User not found' });
            }

            // Ensure role matches between token and database
            if (decoded.role !== user.role) {
                console.log('Role mismatch:', {
                    tokenRole: decoded.role,
                    dbRole: user.role,
                    userId: decoded.id
                });
                return res.status(401).json({ error: 'Invalid token' });
            }

            console.log('Auth successful:', { 
                userId: user._id, 
                role: user.role,
                name: user.name
            });

            // Set user info in request object
            req.user = {
                userId: user._id.toString(),
                _id: user._id,
                id: user._id.toString(), // Add id field for compatibility
                role: user.role,
                name: user.name,
                email: user.email
            };

            next();
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const isInstructor = (req, res, next) => {
    if (req.user.role !== 'Instructor' && req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Access denied. Instructor role required.' });
    }
    next();
};

module.exports = { auth, isInstructor }; 