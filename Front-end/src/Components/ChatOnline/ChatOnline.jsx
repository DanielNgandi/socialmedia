import "./chatOnline.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatOnline() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/online", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOnlineUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch online users", err);
      }
    };

    fetchOnlineUsers();
  }, []);

  return (
    <div className="chatOnline">
      {onlineUsers.map((user) => (
        <div className="chatOnlineFriend" key={user.id}>
            <div className="chatOnlineImgCointainer">
                <img className="chatOnlineImg" 
                src={
            user?.avatar
              ? `http://localhost:5000${user.avatar}`
              : '/assets/person/defaultAvatar.png'
          }
          alt="" />
                <div className="chatOnlineBadge"> </div>
            </div>
            <span className="chatOnlineName">{user.name || user.username}</span>
        </div>
      ))}
    </div>
  )
}
