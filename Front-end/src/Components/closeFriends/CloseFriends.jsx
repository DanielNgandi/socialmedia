import './closeFriends.css'
//import { Users } from '../../data.js'

export default function CloseFriends({user}) {
  return (
    <li className="sidebarFriend">
        <img className='sidebarFriendImg' src={user.profilePicture} alt=''/>
        <span className='sidebarFriendName'> {user.username}</span>
    </li>
  )
}
