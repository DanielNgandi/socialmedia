import '../.././index.css';
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import{Search, Person, Chat, Notifications} from "@mui/icons-material";

export default function Topbar() {
    const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
                <Notifications/>
                <span className="topbarIconBadge">3</span>
            </div>
        </div>
        <img src="/assets/person/img1.png" alt="" className='topbarImg'/>
      </div>
            {user && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
}
