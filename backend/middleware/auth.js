const jwt  = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');

    if (!user)          return res.status(401).json({ message: 'User not found' });
    if (!user.isActive) return res.status(401).json({ message: 'Account disabled' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user)                    return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role !== 'admin')    return res.status(403).json({ message: 'Admin access only' });
  next();
};

exports.canAddInventory = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role === 'admin') return next();
  if (!req.user.permissions || !req.user.permissions.canAddInventory)
    return res.status(403).json({ message: 'You do not have permission to add inventory' });
  next();
};

exports.canUploadBills = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (req.user.role === 'admin') return next();
  if (!req.user.permissions || !req.user.permissions.canUploadBills)
    return res.status(403).json({ message: 'You do not have permission to upload bills' });
  next();
};