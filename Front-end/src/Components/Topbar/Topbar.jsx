import '../.././index.css';
import { useContext,useEffect, useState  } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import{Search, Person, Chat, Notifications} from "@mui/icons-material";

import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust your port

export default function Topbar() {
   const [notifications, setNotifications] = useState(0);
    const {currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
   // 🔔 Real-time notification setup
  useEffect(() => {
    socket.on("notifyNewPost", () => {
      setNotifications((prev) => prev + 1);
    });

    return () => socket.off("notifyNewPost");
  }, []);

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
             <div className='topbarIconItem'>
                <Chat/>
                <span className="topbarIconBadge">2</span>
            </div>
              <div className='topbarIconItem'>
            <Notifications />
            {notifications > 0 && (
              <span className="topbarIconBadge">{notifications}</span>
            )}
          </div>
        </div>
        <img src={currentUser?.avatar || "/assets/person/img3.png"} alt="Profile"
       className='topbarImg'/>
      </div>
            {currentUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
}
