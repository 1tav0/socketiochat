import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"]
  },
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  avatar: {
    type: String,
    default: ""
  }
}, {timestamps: true});


userSchema.pre("save", async function (next) {
  // if password is reset to a new one we have to hash it
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // if password is reset to a new one we have to hash it again else continue
  // if (!this.isModified('password')) {
  //   next();
  // }
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", userSchema);
export default User;