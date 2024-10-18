const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.userSignup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "Validation Error", ["All fields are required"]);
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(400, "User already exists. Please log in.");
  }

  const user = new User({ username, email, password });
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, { user }, "User created successfully"));
});

exports.userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Validation Error", ["All fields are required"]);
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid username or password");
  }

  const token = user.generateAccessToken();
  user.isLoggedIn = true;
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: { username: user.username }, token },
        "Login successful"
      )
    );
});

exports.userLogout = asyncHandler(async (req, res) => {
  req.user.isLoggedIn = false;
  await req.user.save();
  res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

exports.verifyUser = asyncHandler(async (req, res) => {
  // The user is already attached to the request by the verifyToken middleware
  const user = req.user;
  res.status(200).json(new ApiResponse(200, { user }, "User verified successfully"));
});
