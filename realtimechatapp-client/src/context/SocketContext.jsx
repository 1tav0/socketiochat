import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id
        }
      });

      setSocket(socket);

      // once we are connected we would like to see who is connected and who is not here in the front end
      //socket.on() is used to listen to the events. can be used both on client and server side
      // socket.emit() is used to send the events. can be used both on client and server side
      // this will return us the online users based on the event name from the backend and then we set the online users to be used in the front end
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      })

      //clean up function
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{socket, onlineUsers}}>
    {children}
  </SocketContext.Provider>
}