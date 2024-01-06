import {  useState } from "react";
import axios from "axios";
import ConversationCard from "./ConversationCard";

const ChatApp = () => {
  const [userText, setUserText] = useState("");
  const [conversations, setConversations] = useState([]);

  const handleMessageSend = async () => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text: userText,
        },
      },
    };
    // conversations.push(conversation);
    setConversations((prevConversations) => [
      ...prevConversations,
      conversation,
    ]);

    const textQueryVariable = {
      text: userText,
    };
    try {
      const response = await axios.post(
        // `https://gaffis.in/gaffis-chatbot/api/dialogflow/textQuery`,
      "http://localhost:5000/api/dialogflow/textquery",
        textQueryVariable
      );
      const content = response.data.fulfillmentMessages[0];
      conversation = {
        who: "Bot",
        content,
      };
      //   conversations.push(conversation);
      setConversations((prevConversations) => [
        ...prevConversations,
        conversation,
      ]);
    } catch (error) {
      conversation = {
        who: "Bot",
        content: {
          text: {
            text: "Error Occured , please check the problem",
          },
        },
      };
      //   conversations.push(conversation);
      setConversations((prevConversations) => [
        ...prevConversations,
        conversation,
      ]);
    }
    setUserText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userText) {
        handleMessageSend();
      } else {
        alert("Type something first");
      }
      e.preventDefault();
    }
  };
  return (
    <div className="content-box">
      <div></div>
      <div className="user-input-container">
        <ConversationCard conversations={conversations} />
        <input
          className="user-input"
          placeholder="Type a Message"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
        />
      </div>
    </div>
  );
};

export default ChatApp;
