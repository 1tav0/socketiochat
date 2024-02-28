import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connect from "./db/connect.js";
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 3000;
// we get the directive we are in
const __dirname = path.resolve();

//middleware
app.use(cors({
  origin: 'http://localhost:3000', // client-side origin 
  credentials: true // Allow credentials
}));
app.use(express.json());
app.use(cookieParser());
//routes
// you need to ensure that your route configurations are properly defined and that there are no conflicting routes.
// Make sure that the route for /users is defined before the route for /messages/:id in your route configuration.
// Express routes are evaluated in the order they are defined, so if a request matches the /users route, it should be handled before it's interpreted as a parameter for the /messages/:id route.
app.use("/api/v1", userRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1", authRoute);
// static middleware to serve static files such as html, css, js, image and sound files
// connect where we want these static files to be stored
// our bundled app is will be stored in dist
app.use(express.static(path.join(__dirname, "/realtimechatapp-client/dist")))

//create the static file and store in dist folder for any route that is not the ones above
// with this we can run our frontend from the server as well
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "realtimechatapp-client", "dist", "index.html"));
})


// server
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}
start();
