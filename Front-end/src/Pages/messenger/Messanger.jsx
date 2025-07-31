import './messenge.css'
import Conversation from '../../Components/conversations/Conversation.jsx';
import Topbar from '../../Components/Topbar/Topbar.jsx';
import Message from '../../Components/message/Message.jsx';
import ChatOnline from '../../Components/chatOnline/ChatOnline.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext.jsx';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function Messanger() {
  const { currentUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

    useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket.current.on('receiveMessage', (data) => {
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.id === arrivalMessage.conversationId &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  
   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setAllUsers(res.data.filter(user => user.id !== currentUser.id));
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [currentUser.id]);

  const handleUserClick = async (user) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`http://localhost:5000/api/chat/conversations`, {
        senderId: currentUser.id,
        receiverId: user.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setCurrentChat(res.data);
    } catch (err) {
      console.error("Failed to start conversation:", err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/chat/messages/${currentChat.id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }  
        );
        setMessages(res.data);
      } catch (err) {
        console.log("Message fetch error:", err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: currentUser.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:5000/api/chat/messages',
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      socket.current.emit('sendMessage', res.data);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
   <>
    <Topbar/>
     <div className='messenger'>
    <div className='chatMenu'>
        <div className="chatMenuWraper">
            {allUsers.map((user) => (
              <div key={user.id} onClick={() => handleUserClick(user)}>
                <Conversation user={user} />
              </div>
            ))}
        </div>
    </div>
    <div className='chatBox'>
  <div className="chatBoxWraper">
  <div className="chatBoxTop">
    {currentChat ? (
      messages.map((m, i) => (
        <div key={i} ref={scrollRef}>
          <Message own={m.senderId === currentUser.id} message={m} />
        </div>
      ))
    ) : (
      <>
        <Message own={false} message={{ text: "Welcome! Select a conversation to start chatting." }} />
      </>
    )}
  </div>
  <div className="chatBoxBottom">
    <textarea
      className="chatMessageInput"
      placeholder="Write something..."
      onChange={(e) => setNewMessage(e.target.value)}
      value={newMessage}
    ></textarea>
    <button className="chatSubmit" onClick={handleSend}>send</button>
  </div>
</div>
    </div>
    <div className='chatOnline'>
         <div className="chatonlineWraper">
            <ChatOnline />
         </div> 
    </div>
     </div>
    </>
  )
}
