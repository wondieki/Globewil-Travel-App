import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setError('');  // Reset error when fetching new blog
      try {
        const res = await axios.get(`/blogs/${id}`); // ✅ Use proxy path — no full URL

        if (res.data) {
          setBlog(res.data);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        console.error('Blog not found:', err);
        setError('Blog post could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="loading">Loading blog post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="error">No blog found.</p>;

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-link">&larr; Back to Blog</Link>
      <h1 className="blog-post-title">{blog.title}</h1>
      <div className="blog-post-content">{blog.content}</div>
    </div>
  );
};

export default BlogPost;
