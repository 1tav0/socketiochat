import User from "../models/user.model.js";
import generateToken from "../config/generateToken.js";

export const signup = async (req, res) => {
  const { fullName,username,password,gender,confirmPassword} = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({error: "Passwords do not match"})
    }
    const user = await User.findOne({ username });
    if (!user) {

      const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = await User.create({
        fullName,
        username,
        password,
        gender,
        avatar: gender === "male" ? boyAvatar : girlAvatar
      })
      const token = generateToken(newUser._id, res);
      // res.status(201).json(newUser);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        avatar: newUser.avatar,
        token: token
      });

    } else {
      return res.status(400).json({ error: "Username already in use", success: false });
      // throw new Error("username already in use");
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    
    const user = await User.findOne({ username:username });
    if (user && await user.isPasswordMatched(password)) {
      const token = generateToken(user._id, res);
      res.status(200).json({
        _id: user?._id,
        fullName: user?.fullName,
        userName: user?.username,
        avatar: user?.avatar,
        token: token
      })
      // res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
