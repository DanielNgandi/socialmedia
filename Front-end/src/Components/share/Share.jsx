import './share.css'
import{PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material'
import { useContext,useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import axios from "axios";

export default function Share({ onPostCreated }) {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      return alert('Post cannot be empty');
    }

    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('content', content);
      if (file) formData.append('file', file); // must match backend: file

      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setFile(null);
      if (onPostCreated) onPostCreated(res.data);
    } catch (err) {
      console.error('Post creation failed:', err.response?.data || err.message);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='share'>
        <div className='shareWrapper'>
          
          <form onSubmit={handleSubmit}>
      <div className='shareButton'>
            <div className="shareOptions">
                <div className="shareoption" onClick={() => fileInputRef.current.click()}>
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
           <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div className="sharetop">
            
            <img className='shareProfileImg'   
            src={currentUser?.avatar ? `http://localhost:5000${currentUser.avatar}` : '/assets/person/defaultAvatar.png'}
  alt="Profile"/> 
             <input placeholder={`What's on your mind, ${currentUser?.username || "User"}?`}
              className='shareInput' value={content}
              onChange={(e) => setContent(e.target.value)}/>
          </div>
          {file && (
            <div className="shareImgPreview">
              <img src={URL.createObjectURL(file)} alt="preview" className="shareImgPreviewImg" />
              <span onClick={() => setFile(null)} className="shareCancelImg">x</span>
            </div>
          )}
          
          </form>
        </div>
    </div>
  )
}
