import "./post.css"
import{MoreVert} from "@mui/icons-material"
import { Users } from '../../data.js'
import { useState } from "react"

export default function Post({Post}) {
    const [like, setLike] = useState(Post.like)
    const [isliked, setIsLiked] = useState(false)

    const likeHandler =()=>{
        setLike(isliked ? like-1 : like+1)
        setIsLiked(!isliked)
}
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src={Users.filter((u)=>u.id===Post.userId)[0].profilePicture} alt="" />
                    <span className="postUsername">{Users.filter((u)=>u.id===Post.userId)[0].username}</span>
                    <span className="postDate">{Post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div> 
            </div>
            <div className="postCenter">
                <span className="postText">{Post?.desc}</span>
                <img className="postImg" src={Post.Photo} alt="" />
            </div>
            <div className="postButton">
                <div className="postButtonTopLeft">
                    <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="/assets/love.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postButtonTopRight">
                   <span className="postCommentText">{Post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
