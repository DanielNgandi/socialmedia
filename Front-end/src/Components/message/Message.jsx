import './message.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Message({ message, own}) {
  console.log("Message content:", message);
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchSender = async () => {
      if (!message?.senderId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/${message.senderId}`
          ,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        setSender(res.data);
      } catch (err) {
        console.error('Error fetching sender:', err);
      }
    };

    fetchSender();
  }, [message?.senderId]);

  return (
    
      <div className={own ? " message own" : "message" }>
        <div className="messageTop">
            <img className='messageImg'  
             src={
            sender?.avatar
              ? `http://localhost:5000${sender.avatar}`
              : '/assets/person/defaultAvatar.png'
          }
          alt="profile"
        />
        <p className="messageText">{message.text}</p>
      </div>
        <div className="messageButtom">
          {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      </div>
  )
}
