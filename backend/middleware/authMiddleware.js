import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." })
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in the middleware: ", error.message);
    res.status(500).json({error: "Internal middleware service error"});
  }
}

export default authMiddleware;