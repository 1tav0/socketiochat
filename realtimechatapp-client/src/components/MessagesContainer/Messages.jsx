import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../Skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { loading, messages } = useGetMessages();
  // will listen for any incoming messages from the socket
  useListenMessages();
  
  const lastMessageRef = useRef();
  useEffect(() => { 
    // rendering time affects this
    // lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    // delay it some time
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  },[messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
      {
        // if is loading use the skeleton component 3 times
        loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
      }

      {
        !loading && messages.length > 0 && messages.map(message => (
          <div
            key={message._id}
            ref={lastMessageRef}
          >
            <Message
              message={message}
            />
          </div>
        ))
      }

      {
        !loading && messages.length === 0 && (
          <p className="text-center">Send a message to start the conversation</p>
        )
      }
    </div>
  )
}

export default Messages