import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.email;
    next();
  } catch (err) {
    console.log("Middleware error:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const isAuthenticate = isAuthenticated;
