import '../.././index.css';
import { useContext,useEffect, useState  } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import{Search, Person, Chat, Notifications} from "@mui/icons-material";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Topbar() {
  const [notifications, setNotifications] = useState(0);
  const [messageNotifCount, setMessageNotifCount] = useState(0);
  const {currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("Current user in Topbar:", currentUser);
  useEffect(() => {
  const fetchNotifications = async () => {
     if (!currentUser?.token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/chat/notifications/messages", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`, 
        },
      });
      const unread = Array.isArray(res.data) ? res.data.filter((notif) => !notif.isRead) : [];

      setMessageNotifCount(unread.length);
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications();
}, [currentUser]);
   
  useEffect(() => {
    socket.on("notifyNewPost", () => {
      setNotifications((prev) => prev + 1);
    });

    return () => socket.off("notifyNewPost");
  }, []);

  
 useEffect(() => {
  
  socket.on("newMessageNotification", () => {
    setMessageNotifCount(prev => prev + 1);
  });

  return () => {
    socket.off("newMessageNotification");
  };
}, []);
useEffect(() => {
  socket.on("newFollower", () => {
    setNotifications(prev => prev + 1);
  });

  return () => {
    socket.off("newFollower");
  };
}, []);



const handleChatClick = async () => {
  if (!currentUser?.token) return;
  try {
    await axios.put("http://localhost:5000/api/chat/notifications/messages/mark-read", {}, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setMessageNotifCount(0);
    navigate("/messenger");
  } catch (err) {
    console.error("Failed to mark messages read:", err);
  }
};

const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <span className='logo'>Dansocialmedia</span>
      </div>
      <div className="topbarcenter">
        <div className='searchbar'>
            <Search className='searchIcon'/>
            <input placeholder="search for friend, post or video" className='searchInput'/> 
        </div>
      </div>
      <div className="topbarRight">
        <div className='topbarlinks'>
            <span className='topbarlink'>Homepage</span>
            <span className='topbarlink'>timeline</span>
        </div>
        <div className='topbaricons'>
            <div className='topbarIconItem'>
                <Person/>
                <span className="topbarIconBadge">1</span>
            </div>
             <div className='topbarIconItem'  onClick={handleChatClick}>
                <Chat />
                {messageNotifCount > 0 && (
    <span className="topbarIconBadge">{messageNotifCount}</span>
       )}
            </div>
              <div className='topbarIconItem'>
            <Notifications />
            {notifications > 0 && (
              <span className="topbarIconBadge">{notifications}</span>
            )}
          </div>
        </div>
        <img
  src={currentUser?.avatar ? `http://localhost:5000${currentUser.avatar}` : '/assets/person/defaultAvatar.png'}
  alt="Profile"
       className='topbarImg'/>
      </div>
            {currentUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
}
