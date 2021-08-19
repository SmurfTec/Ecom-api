const catchAsync = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/token');

// get all users
const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(`req.body`, req.body);
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or Password ');
  }
});

// get all users
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(' User already exists ');
  }
  const user = await User.create({ name, email, password });
  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(400);
    throw new Error(' invalid user data ');
  }
});

// get userProfile
const getuserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error(' User not Found ');
  }
});


// update userProfile
const updateUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    const token = generateToken(updatedUser._id);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    res.status(404);
    throw new Error(' User not Found ');
  }
});

// get all users  admin-only

const getusers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});
// delete user admin-only
const deleteuser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: 'user removed',
    });
  } else {
    res.status(404);
    throw new Error(' User not found ');
  }
});

// getUSer admin-only
const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error(' User not found ');
  }
});

// update User admin-only
const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin=req.body.isAdmin 

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(' User not Found ');
  }
});
module.exports = {
  authUser,
  registerUser,
  getuserProfile,
  updateUserProfile,
  getusers,
  deleteuser,
  getUser,
  updateUser
};
