import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => { 
    const abortController =  new AbortController();
    const getMessages = async () => {

      setLoading(true);
      try {
        const response = await api.get(`/api/v1/${selectedConversation._id}`, {
          signal: abortController.current?.signal
        });
        const data = response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted race condition thread");
          return;
        }
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    if(selectedConversation?._id) getMessages();

    return (() => {
      abortController.abort();
    })
  },[selectedConversation._id, setMessages])

  return { loading, messages };
}

export default useGetMessages