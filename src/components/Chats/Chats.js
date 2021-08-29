import React from "react";
import "./Chats.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon />
      </div>

      <div className="chats__posts">
        {posts.map(({id, data: {profilePic,username, timestamp,imageUrl,read}})=>(
            <Chat 
            key={id}
            id={id}
            username={username}
            profilePic={profilePic}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            />
        ))}
      </div>
    </div>
  );
}

export default Chats;