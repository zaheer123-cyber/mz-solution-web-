import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';
import { getRequiredSecret } from '../config/security.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Also support Bearer authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }

    const secret = getRequiredSecret('JWT_SECRET');
    const decoded = jwt.verify(token, secret);

    const user = await AdminUser.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please log in again.'
      });
    }
    next(error);
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Superadmin privileges required.'
    });
  }
  next();
};
