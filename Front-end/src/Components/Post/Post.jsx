import "./post.css"
import{MoreVert} from "@mui/icons-material"
//import { Users } from '../../data.js'
import { useState } from "react"
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Post({post, onPostDeleted, currentUser}) {
  const [like, setLike] = useState(post.likeCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [showOptions, setShowOptions] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/posts/${post.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

     onPostDeleted(post.id);
     alert("✅ Deletion successful");
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
   alert("❌ Deletion failed");  
}
};
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src={post.author?.avatar || "/assets/person/img3.png"} alt=""/>
                    <span className="postUsername">{post.author?.username}</span>
                    <span className="postDate">{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <div className="postTopRight">
                 <MoreVert onClick={() => setShowOptions(!showOptions)} style={{ cursor: "pointer" }} />
            {showOptions && currentUser?.id === post.author?.id && (
              <div className="postOptionsDropdown">
              <button className="deleteButton" onClick={handleDelete}>
                Delete
              </button>
              </div>
            )}
                </div> 
            </div>
            <div className="postCenter">
              {post.content && <span className="postText">{post.content}</span>}
              {post.image && <img className="postImg" src={post.image} alt="post" />}
            </div>
            <div className="postButton">
                <div className="postButtonTopLeft">
                    <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="/assets/love.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postButtonTopRight">
                   <span className="postCommentText">{post.commentCount || 0} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
