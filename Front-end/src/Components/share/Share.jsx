import './share.css'
import{PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material'
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import axios from "axios";

export default function Share({ onPostCreated }) {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post content cannot be empty");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setContent("");
      setImage("");
      if (onPostCreated) onPostCreated(res.data); // Notify parent
    } catch (err) {
      console.error("Post creation failed:", err.response?.data || err.message);
    }
  };
  return (
    <div className='share'>
        <div className='shareWrapper'>
          
          <form onSubmit={handleSubmit}>
          <div className="sharetop">
            
            <img className='shareProfileImg' src={currentUser?.avatar || "/assets/person/img3.png"} alt="" /> 
             <input placeholder={`What's on your mind, ${currentUser?.username || "User"}?`}
              className='shareInput' value={content}
              onChange={(e) => setContent(e.target.value)}/>
          </div>
           <input
            placeholder="Image URL (optional)"
            className="shareInputImage"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
         </form>  
          <div className='shareButton'>
            <div className="shareOptions">
                <div className="shareoption">
                    <PermMedia htmlColor='tomato' className='shareIcon'/>
                    <span className='shareOptionText'> Photo or video</span>
                </div>
                <div className="shareoption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'> Tags</span>
                </div>
                <div className="shareoption">
                    <Room htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'> Location</span>
                </div>
                <div className="shareoption">
                    <EmojiEmotions htmlColor='gold' className='shareIcon'/>
                    <span className='shareOptionText'> Feelings</span>
                </div> 
            </div>
            <button className='sharebutton' onClick={handleSubmit}>Share</button>
          </div>
        </div>
    </div>
  )
}
