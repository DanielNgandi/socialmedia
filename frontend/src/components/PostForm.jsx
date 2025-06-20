import { useState } from 'react';
import { usePosts } from '../context/PostContext';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const { createPost } = usePosts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPost(content);
      onPostCreated(newPost);
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded-lg"
        placeholder="What's on your mind?"
        rows={3}
        required
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
}