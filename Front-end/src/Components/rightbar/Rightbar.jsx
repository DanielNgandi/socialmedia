import './Rightbar.css'
import { Users } from '../../data'
import Online from '../Online/Online.jsx'
export default function Rightbar(Profile) {
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
        {Users.map((u)=>(
          <Online key={u.id} user={u}/>
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
        <div className="rightbarFollowing">
         <img src="assets/person/img1.png" alt="" className="rightbarFollowingImg" />
         <span className="rightbarFollowingName">john carter</span>
       </div>
       <div className="rightbarFollowing">
         <img src="assets/person/img2.png" alt="" className="rightbarFollowingImg" />
         <span className="rightbarFollowingName">john carter</span>
       </div>
       <div className="rightbarFollowing">
         <img src="assets/person/img3.png" alt="" className="rightbarFollowingImg" />
         <span className="rightbarFollowingName">john carter</span>
       </div>
       <div className="rightbarFollowing">
         <img src="assets/person/img4.png" alt="" className="rightbarFollowingImg" />
         <span className="rightbarFollowingName">john carter</span>
       </div>
       <div className="rightbarFollowing">
         <img src="assets/person/img5.png" alt="" className="rightbarFollowingImg" />
         <span className="rightbarFollowingName">john carter</span>
       </div>
       </div>
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
