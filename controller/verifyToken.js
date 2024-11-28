const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Headers:", req.headers);

  const token = req.headers["authorization"]?.split(" ")[1];
  //   console.log("req.headers['authorization']",req.headers['authorization']);
  //   console.log("Token:", token);

  if (req.path === "/login" || req.path === "/register") {
    return next();
  }

  if (!token) {
    return res.status(401).json({
      error: "Access denied.",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, "role");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token error:", error);
    return res.status(400).json({
      error: "Invalid token.",
      success: false,
    });
  }
};

module.exports = verifyToken;
