import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  //check if message is ours or from user
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  // to style the chat bubble direction
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  // to choose profile pic
  const profilePic = fromMe ? authUser.avatar : selectedConversation?.avatar;
  // choose who sent messge
  const name = fromMe ? authUser.fullName : selectedConversation.fullName;
  // the background color
  const backColor = fromMe ? "bg-blue-500" : "";
  // make the time dynamic
  const formattedDate = extractTime(message.createdAt);
  // for shake animation
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className="flex flex-col">
      <div className={`chat ${chatClassname}`}>
        <div className="chat-header">
          {name}
        </div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} alt="avatar" />
          </div>
        </div>
        <div className={`chat-bubble text-white ${backColor}
          ${shakeClass}
        `}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">{formattedDate}</div>
      </div>
    </div>
  )
}

export default Message