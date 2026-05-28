const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.addStaff = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const staff = await User.create({
      name, email,
      password: hashed,
      role: 'staff',
      permissions
    });

    res.status(201).json({ id: staff._id, name, email, role: staff.role, permissions: staff.permissions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { permissions, isActive, role } = req.body;
    const staff = await User.findByIdAndUpdate(
  req.params.id,
  { permissions, isActive, role },
  { returnDocument: 'after' }
).select('-password');
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeStaff = async (req, res) => {
  try {
    const staff = await User.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.disableStaff = async (req, res) => {
  try {
    const staff = await User.findByIdAndUpdate(
  req.params.id,
  { isActive: false },
  { returnDocument: 'after' }
).select('-password');
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff disabled', staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};