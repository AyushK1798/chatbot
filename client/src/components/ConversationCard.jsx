import { useRef } from "react";
import { useEffect, useState } from "react";

const ConversationCard = ({ conversations }) => {
  //   const [conversations, setConversations] = useState([]);
  const conversationEndRef = useRef(null);
  useEffect(() => {
    //   const localData = localStorage.getItem("conversations");
    //   const conversations = JSON.parse(localData);
    //   setConversations(conversations);
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);
  return (
    <div className="chat-list of-y">
      {conversations?.map((convo, index) => (
        <div
          key={index}
          className={convo.who === "user" ? "m-2 text-end" : "m-2 text-start"}
        >
          {/* <p className="text-secondary">{convo?.who}</p> */}
          <span
            className={
              convo.who === "user"
                ? "chat-item p-1 px-2 rounded"
                : "chat-item-inverse p-1 px-2 rounded"
            }
          >
            {convo?.content.text.text}
          </span>
        </div>
      ))}
      <div ref={conversationEndRef} />
    </div>
  );
};

export default ConversationCard;
