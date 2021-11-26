import React, { useEffect, useState } from "react";
import "./Chat.css";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { IconButton } from "@material-ui/core";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "../../features/chatSlice";
import db from "../../Firebase/firebase";
import firebase from "firebase";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    //firebase magic...
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      userId: user.userId,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };
  return (
    <div className="chat">
      {/* Chat header */}
      <div className="chat__header">
        <h4>
          <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* Messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
