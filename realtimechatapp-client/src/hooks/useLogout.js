import { useState } from "react";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/v1/logout");
      const data = await response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch(error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, logout };
}

export default useLogout