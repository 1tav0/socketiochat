import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (activeConversation) => set({ selectedConversation:activeConversation }),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages })
}))

export default useConversation;