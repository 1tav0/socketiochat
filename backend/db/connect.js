import mongoose from "mongoose";

const connect = async (url) => {
  return mongoose.connect(url)
    .then(() => {
      console.log("Successfully connected to the database");
    })
}

export default connect