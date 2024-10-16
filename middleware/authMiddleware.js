const User = require("../Models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded.user.id);

    req.user = await User.findById(decoded.user.id).select("-password");
    console.log("req.user", req.user);

    next();
  } catch (error) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
