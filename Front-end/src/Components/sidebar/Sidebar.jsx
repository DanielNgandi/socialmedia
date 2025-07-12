import './sidebar.css';
import { Link } from "react-router-dom";
import {Chat, Bookmarks, Groups, HelpOutline, PlayCircleFilledOutlined, RssFeed, School,Event, WorkOutline,Home, Person} from "@mui/icons-material"
import { Users } from '../../data.js'
import CloseFriends from '../closeFriends/CloseFriends.jsx'

export default function Sidebar() {
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
                <Link to="/users" className="navLink">Find Friends</Link>

            </li>
            </div>

            <li className='sidebarListItem'>
                <RssFeed className='sidebarIcon'/>
                <span className="sidebarListItemText">Feed</span>
            </li>
            <li className='sidebarListItem'>
                <Chat className='sidebarIcon'/>
                <span className="sidebarListItemText">Chats</span>
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
                {Users.map((u)=>(
                <CloseFriends key={u.id} user={u}/>
                ))}
                
            </ul>
        </div>

      </div>
    </div>
  )
}
