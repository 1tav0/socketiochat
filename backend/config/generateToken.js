import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" })
  console.log(token);
  res.cookie("jwt", token, {
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks (users cannot access this cookie via js)
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict", // CSTF attacks cross-site request forgery attacks
    // secure: process.env.NODE_ENV !== "development"
  })
  return token;
}

export default generateToken