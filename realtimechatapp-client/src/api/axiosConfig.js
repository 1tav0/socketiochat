import axios from "axios";

// since you are using Axios to make HTTP requests, you need to ensure that Axios is configured to send credentials (including cookies) with cross-origin requests. To achieve this, you can set the withCredentials option to true 
export default axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})