import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../../Firebase/firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  const addChat = () => {
    const chatName = prompt("chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  console.log(chats);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photo} className="sidebar__avatar" />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__logout">
        <Button onClick={() => auth.signOut()} className="logout__button">
          Sign out
        </Button>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
