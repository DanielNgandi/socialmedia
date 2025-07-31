import './Rightbar.css'
//import { Users } from '../../data'
import Online from '../Online/Online.jsx'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function Rightbar({Profile}) {
  const { currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/follow/following/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFriends(res.data);
      } catch (err) {
        console.error("Failed to fetch friends", err);
      }
    };
        const fetchOnlineUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/online", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (Array.isArray(response.data)) {
        setOnlineUsers(response.data);
        } else {
          console.error("Expected array of online users, got:", response.data);
        }

      } catch (err) {
        console.error("Failed to fetch online users", err);
      }
    };


    if (currentUser?.id) {
      fetchFriends();
      fetchOnlineUsers();
    }
  }, [currentUser]);

  const HomeRightBar =() =>{
    return(
      <>
      <div className='birthdayCointainer'>
         <img className='birthdayImg' src="/assets/bd.png" alt="" />
         <span className='bithdayText'>
          <b>Daniel Ngandi </b>and <b>two other friends </b>have a birthday today
          </span>
      </div>
       <img className='rightbarAd' src="/assets/person/img5.png" alt="" />
       <h4 className="rightbarTitle">Online friends</h4>
       <ul className="rightbarFriendList">
        {onlineUsers.map((user) => (
        <Online key={user.id} user={user} />
        ))}
      </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="righbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue">Nairobi</span>
        </div>
        <div className="righbarInfoItem">
          <span className="rightbarInfoKey">From</span>
          <span className="rightbarInfoValue">Thika</span>
        </div>
        <div className="righbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
       <div className="rightbarFollowings">
         {friends.map((friend) => (
    <div className="rightbarFollowing" key={friend.id}>
      <img
        src={friend.avatar || "/assets/person/img3.png"}
        alt=""
        className="rightbarFollowingImg"
      />
      <span className="rightbarFollowingName">{friend.name || friend.username}</span>
    </div>
  ))}
    
       </div>
     <h4 className="rightbarTitle">Online Users</h4>
        <ul className="rightbarFriendList">
          {onlineUsers.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className='rightWrapper'>
        {Profile ? <ProfileRightbar/> : <HomeRightBar/>}
      </div>
    </div>
  )
}
