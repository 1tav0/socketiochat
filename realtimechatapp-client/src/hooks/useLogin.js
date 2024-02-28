import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/v1/login", {
        username,
        password
      });
      // console.log(response);
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      // document.cookie = `jwt=${data.token}; max-age=${30 * 24 * 60 * 60}; path=/;`;
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      //   if (error.response && error.response.status === 400) {
      //     toast.error(error.response.data.error); // Display the specific error message from the server
      //   } else {
      //     toast.error("An unexpected error occurred"); // Handle other errors
      // }
        toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password length must be atleast 6 characters long');
    return false;
  }
  return true;
}