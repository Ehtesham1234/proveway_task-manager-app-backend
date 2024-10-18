const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (role) => async (req, res, next) => {
  let token;
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    }
    console.error("Token verification error:", err);
    return res.status(403).send(`Invalid Token: ${err.message}`);
  }
};
