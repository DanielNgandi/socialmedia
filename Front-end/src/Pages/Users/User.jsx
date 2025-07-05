import './Users.css';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Users() {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    const fetchFollowings = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`http://localhost:5000/api/follow/following/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowedUsers(res.data.map((u) => u.id));
      } catch (err) {
        console.error('Failed to fetch followings:', err);
      }
    };

    fetchUsers();
    fetchFollowings();
  }, [currentUser]);

  const toggleFollow = async (targetId) => {
    const token = localStorage.getItem('token');
    try {
      if (followedUsers.includes(targetId)) {
        await axios.delete(`http://localhost:5000/api/follow/${targetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowedUsers(followedUsers.filter((id) => id !== targetId));
      } else {
        await axios.post(`http://localhost:5000/api/follow/${targetId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowedUsers([...followedUsers, targetId]);
      }
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    }
  };

  return (
    <div className="usersPage">
      <h2>All Users</h2>
      {users.map((user) => (
        <div key={user.id} className="userCard">
          <img src={user.avatar || "/assets/person/img3.png"} alt="" className="userAvatar" />
          <Link to={`/profile/${user.id}`} className="userName">{user.name || user.username}</Link>
          <button onClick={() => toggleFollow(user.id)} className="followBtn">
            {followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}
