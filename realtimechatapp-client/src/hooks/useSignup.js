import { useState } from "react";
import api from "../api/axiosConfig";
// custom hook to make it cleaner in the signup component with less code 
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// will return a state 
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      // const response = await fetch("http://localhost:5000/api/auth/signup", {
      //   method: "Post",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     fullName,
      //     username,
      //     password,
      //     confirmPassword,
      //     gender
      //   })
      // })
      // const data = await response.json();
      // console.log(data);
      const response = await api.post("/api/v1/signup", {
        fullName,
        username,
        password,
        confirmPassword,
        gender
      })
      const data = await response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      // save to local storage
      localStorage.setItem("chat-user", JSON.stringify(data))
      // conntext
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, signup };
}

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password length must be atleast 6 characters long');
    return false;
  }
  return true;
}