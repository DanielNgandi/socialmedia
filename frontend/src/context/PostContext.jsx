import { createContext, useContext } from 'react';
import axios from 'axios';

const PostContext = createContext();

export function PostProvider({ children }) {
  // Create new post
  const createPost = async (content) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/posts', { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Get all posts
  const getPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      throw err.response.data;
    }
  };

  // Unlike a post
  const unlikePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}/like`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      throw err.response.data;
    }
  };

  return (
    <PostContext.Provider value={{ createPost, getPosts, likePost, unlikePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}