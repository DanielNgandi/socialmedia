import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { getUser, followUser } = useUsers();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const id = userId || currentUser?.id;
        if (!id) return;
        
        const userData = await getUser(id);
        setProfileUser(userData);
        setIsFollowing(userData.isFollowing || false);
        // Load user posts here
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadProfile();
  }, [userId, currentUser, getUser]);

  const handleFollow = async () => {
    try {
      await followUser(profileUser.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  if (!profileUser) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <img 
          src={profileUser.avatar || '/default-avatar.png'} 
          alt={profileUser.name}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{profileUser.name}</h1>
          <p className="text-gray-600">@{profileUser.username}</p>
          {profileUser.id !== currentUser?.id && (
            <button
              onClick={handleFollow}
              className={`mt-2 px-4 py-1 rounded-md ${
                isFollowing 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}