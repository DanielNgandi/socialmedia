import './feed.css'
import Share from '../share/Share.jsx'
import Post from '../Post/Post.jsx'
//import { posts } from '../../data.js'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../Context/AuthContext.jsx';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched posts:", res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err.response?.data || err.message);
    }
  };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to top
  };

  const handleDeletePost = (id) => {
  setPosts(posts.filter(p => p.id !== id));
};

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {currentUser && <Share onPostCreated={handleNewPost}/>}
        {posts.map((post)=>(
          <Post key={post.id} post ={post} onPostDeleted={handleDeletePost}
          currentUser={currentUser}/>
        ))}
        
      </div>
    </div>
  )
}
