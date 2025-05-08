import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/blogs'); // ✅ Use relative path for proxy

        setBlogs(res.data);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Travel & Immigration Insights</h1>

      <div className="blog-list">
        {loading && <p>Loading blogs...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <p>No blog posts available yet.</p>
        )}

        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content?.substring(0, 150)}...</p>
            <Link to={`/blog/${blog.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
