const User = require("../Models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
