const User = require('../models/userModel');
const Admin = require('../models/adminModel');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate name, email & password
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }

  // Create user
  try {
    const user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide an email and password' });
  }

  // Check for user account
  const user = await User.findOne({ email }).select('+password');
  if (user) {
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      return sendTokenResponse(user, 200, res);
    }
  }

  // Fallback: check admin credentials
  const admin = await Admin.findOne({ email }).select('+password');
  if (admin) {
    const isAdminMatch = await admin.matchPassword(password);
    if (isAdminMatch) {
      return sendTokenResponse(admin, 200, res);
    }
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
};

// Get token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

