import "./Profile.css"
import Topbar from "../../Components/Topbar/Topbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Feed from "../../Components/feed/Feed.jsx";
import Rightbar from "../../Components/rightbar/Rightbar.jsx";



export default function Profile() {
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
             src="assets/person/img3.png" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName" >Daniel ngandi</h4>
              <span className="profileInfoDesc" >hello</span>
            </div>
          </div>
           <div className="profileRightBottom">
            <Feed/>
            <Rightbar Profile/>
           </div>
        </div>
        </div>
        </>
  )
}
