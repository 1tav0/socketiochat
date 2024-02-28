import { useRef, useState } from "react";
import useConversation from "../zustand/useConversation";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  // to avoid race conditions
  const abortControllerRef = useRef(null);

  const sendMessage = async (message) => {
    // abort any render that is loading and hasnt rendered but we have called another render already so to avoid race condition between both
    abortControllerRef.current?.abort();
    // every abort controller is used once so since we aborted we must create a new one every time we abort one
    abortControllerRef.current = new AbortController();
    setLoading(true);
    try {
      const response = await api.post(`/api/v1/send/${selectedConversation._id}`, {
        message
      }, {signal: abortControllerRef.current?.signal})
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      // spread the old messages and include the new one 
      setMessages([...messages, data]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted thread");
        return;
      }
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }
  return { loading, sendMessage };
}

export default useSendMessage