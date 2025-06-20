import { useState } from 'react';
import { usePosts } from '../context/PostContext';

export default function PostCard({ post }) {
  const { likePost } = usePosts();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow">
      <div className="flex items-center mb-3">
        <img 
          src={post.author?.avatar || '/default-avatar.png'} 
          alt={post.author?.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">{post.author?.name}</h3>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      
      <p className="mb-3">{post.content}</p>
      
      <div className="flex items-center">
        <button 
          onClick={handleLike}
          className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        >
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>
      </div>
    </div>
  );
}