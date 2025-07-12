import "./Profile.css"
import Topbar from "../../Components/Topbar/Topbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Feed from "../../Components/feed/Feed.jsx";
import Rightbar from "../../Components/rightbar/Rightbar.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext.jsx";
import axios from "axios";


export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser || null);
  const { userId } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || parseInt(userId) === currentUser?.id;

console.log("userId param:", userId);
console.log("currentUser.id:", currentUser?.id);
 console.log(user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

let userRes;
if (isOwnProfile) {
  userRes = await axios.get("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} else {
  userRes = await axios.get(`http://localhost:5000/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

setUser(userRes.data);

  // Check follow status only for other users
  if (!isOwnProfile) {
   const followRes = await axios.get(`http://localhost:5000/api/follow/is-following/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    });
      setIsFollowing(followRes.data.isFollowing);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
     fetchUser();
  }, [userId, currentUser]);

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem("token");

      if (isFollowing) {
        await axios.delete(`http://localhost:5000/api/follow/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(false);
      } else {
        await axios.post(`http://localhost:5000/api/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Failed to toggle follow", err);
    }
  };

  if (loading || !user) return <div>Loading profile...</div>;

  return (
    
    
     <>
        <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
             <img className="profileCoverImg" 
             src="assets/posts/post3.png" alt="" />
             <img className="profileUserImg" 
             src={user?.avatar || "assets/person/img3.png"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName" >{user?.name}</h4>
              <span className="profileInfoDesc" >{user?.bio || "Hello, I am new here!"}</span>
      
          {user._count && (
             <div className="profileStats">
             <span>{user._count.followers} Followers</span>
             <span>{user._count.following} Following</span>
             </div>
             )} 

            
          
             {user.followers?.length > 0 && (
             <div className="followersList">
               <h4>Followers</h4>
             {user.followers.map((f) => (
            <div key={f.follower.id} className="followerItem">
            <img src={f.follower.avatar || '/assets/person/img3.png'} alt="avatar" className="followerAvatar" />
            <span>{f.follower.name || f.follower.username}</span>
          </div>
         ))}
        </div>
      )}

               {!isOwnProfile && (
                <button className="followButton" onClick={handleFollowToggle}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}

  
            </div>
          </div>
           <div className="profileRightBottom">
            <Feed userId={user.id}/>
            <Rightbar Profile/>
           </div>
         </div>
        </div>
        </>
  )
}
