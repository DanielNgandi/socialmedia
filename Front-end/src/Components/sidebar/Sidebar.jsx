import './sidebar.css';
import { Link } from "react-router-dom";
import {Chat, Bookmarks, Groups, HelpOutline, PlayCircleFilledOutlined, RssFeed, School,Event, WorkOutline,Home, Person} from "@mui/icons-material"
//import { Users } from '../../data.js'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import CloseFriends from '../closeFriends/CloseFriends.jsx'

export default function Sidebar() {
 const { user: currentUser } = useContext(AuthContext);
 //if (!currentUser) return null; // or return a loading spinner
 const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return; // ✅ Prevent crash when currentUser is undefined
    
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/${currentUser.id}/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(res.data);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    };

    fetchFriends();
  }, [currentUser?.id]);

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className="sidebarList">
            <ul>
            <div className="sidebarNavColumn">
             <li className='sidebarListItem'>
                <Link to="/home" className="sidebarLink">
                  <Home className='sidebarIcon'/>
                  <span className="sidebarListItemText">Home</span>
                </Link>
            </li>
            <li className='sidebarListItem'>
                <Link to="/profile" className="sidebarLink">
                  <Person className='sidebarIcon'/>
                  <span className="sidebarListItemText">Profile</span>
                </Link>

            </li>
            </div>

            <li className='sidebarListItem'>
               <Link to="/users" className="sidebarLink">
                <RssFeed className='sidebarIcon'/>
                <span className="sidebarListItemText">Feed</span>
                </Link>
            </li>
            <li className='sidebarListItem'>
              <Link to="/messenger" className="sidebarLink">
                <Chat className='sidebarIcon'/>
                <span className="sidebarListItemText">Chats</span>
                </Link>
            </li>
            <li className='sidebarListItem'>
                <PlayCircleFilledOutlined className='sidebarIcon'/>
                <span className="sidebarListItemText">Video</span>
            </li>
            <li className='sidebarListItem'>
                <Groups className='sidebarIcon'/>
                <span className="sidebarListItemText">Groups</span>
            </li>
            <li className='sidebarListItem'>
                <Bookmarks className='sidebarIcon'/>
                <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className='sidebarListItem'>
                <HelpOutline className='sidebarIcon'/>
                <span className="sidebarListItemText">Questions</span>
            </li>
            <li className='sidebarListItem'>
                <WorkOutline className='sidebarIcon'/>
                <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className='sidebarListItem'>
                <Event className='sidebarIcon'/>
                <span className="sidebarListItemText">Events</span>
            </li>
            <li className='sidebarListItem'>
                <School className='sidebarIcon'/>
                <span className="sidebarListItemText">courses</span>
            </li>
            </ul>
            <button className='sidebarbutton'>Show more</button>
            <hr className='sidebarHr'/>
            <ul className="sidebarFriendList">
                {friends.map((f) => (
                <CloseFriends key={f.id} user={f}/>
                ))}
                
            </ul>
        </div>

      </div>
    </div>
  )
}
