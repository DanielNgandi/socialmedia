import { useState, useEffect } from 'react';
import { usePosts } from '../context/PostContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Home() {
  const { getPosts } = usePosts();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, [getPosts]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PostForm onPostCreated={handleNewPost} />
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}