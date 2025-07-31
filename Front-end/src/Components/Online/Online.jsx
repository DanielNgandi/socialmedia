import './online.css'
//import { useEffect, useState } from "react";
//import axios from "axios";

export default function Online({user}) {

  return (
     <li className="rightbarFriend">
          <div className="rightbarProfileImgCointaner">
            <img className='rightbarProfileImg' 
            src={
            user?.avatar
              ? `http://localhost:5000${user.avatar}`
              : '/assets/person/defaultAvatar.png'
          }
          alt="" />
            <span className="rightbarOnline"></span>
          </div>
          <span className="rightbarUsername">{user.username}</span>
        </li>
  )
}
