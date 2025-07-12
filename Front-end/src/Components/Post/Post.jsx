import "./post.css"
import{MoreVert} from "@mui/icons-material"
//import { Users } from '../../data.js'
import { useState,useEffect,useRef } from "react"
import axios from "axios";


export default function Post({post, onPostDeleted, currentUser}) {
  const [like, setLike] = useState(post.likeCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [showOptions, setShowOptions] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

    const dropdownRef = useRef(); // 👈 1. Create ref

  // 👇 2. Add this useEffect inside the component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  
  useEffect(() => {
    const fetchComments = async () => {
      if (!showComments) return
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`http://localhost:5000/api/posts/${post.id}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setComments(res.data)
      } catch (err) {
        console.error("Failed to fetch comments:", err)
      }
    }

    fetchComments()
  }, [showComments])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post.id}/comments`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setComments([...comments, res.data])
      setNewComment("")
    } catch (err) {
      console.error("Failed to post comment:", err)
    }
  }

const likeHandler = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts/${post.id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setIsLiked(res.data.liked);
    setLike(res.data.likeCount);
  } catch (err) {
    console.error("Failed to toggle like:", err);
  }
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
<div className="postTopRight" ref={dropdownRef}>
  <MoreVert 
  onClick={() => {
    setShowOptions(!showOptions);
    
  }} 
  style={{ cursor: "pointer",backgroundColor: "yellow" }} 
/>

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
            <span
              className="postCommentText"
              onClick={() => setShowComments((prev) => !prev)}
            >
              {post.commentCount || comments.length} comments
            </span>
          </div>
        </div>

        {showComments && (
          <div className="commentSection">
            {comments.map((comment) => (
              <div key={comment.id} className="commentItem">
                <img
                  src={comment.author?.avatar || "/assets/person/img3.png"}
                  alt=""
                  className="commentAvatar"
                />
                <div className="commentContent">
                  <strong>{comment.author?.username}</strong>
                  <p>{comment.content}</p>
                  <span className="commentDate">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <form onSubmit={handleCommentSubmit} className="commentForm">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="commentInput"
              />
              <button type="submit" className="commentButton">
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
