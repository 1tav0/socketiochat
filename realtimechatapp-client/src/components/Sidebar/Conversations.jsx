import { useMemo } from "react";
import useGetConversations from "../../hooks/useGetConversations"
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation"
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const memoizedConversations = useMemo(() => conversations, [conversations]);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        memoizedConversations.map((convo, index) => (
          <Conversation
            key={convo._id}
            conversation={convo}
            emoji={getRandomEmoji()}
            lastIndex={index === memoizedConversations.length-1}
          />
        ))
      }
      {
        loading ? 
          <div className="loading loading-spinner mx-auto"></div>
          :
          null
      }
    </div>
  )
}

export default Conversations

//STARTER CODE 
// import Conversation from "./Conversation"
// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   )
// }

// export default Conversations