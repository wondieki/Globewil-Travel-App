import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminBlogManager.css';

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isCreating, setIsCreating] = useState(false);

  const token = localStorage.getItem('token'); // ✅ Load token

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in both the title and content.');
      return;
    }
    try {
      await axios.post('/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      fetchBlogs();
      setFormData({ title: '', content: '' });
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  const startEdit = (blog) => {
    setEditing(blog.id);
    setFormData({ title: blog.title, content: blog.content });
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', content: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      fetchBlogs();
      cancelEdit();
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  return (
    <div className="admin-blog-manager">
      <h1>Admin Blog Manager</h1>

      <button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? 'Cancel New Blog' : 'Add New Blog'}
      </button>

      {isCreating && (
        <div className="create-blog-form">
          <h2>Create New Blog</h2>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            rows="6"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <button onClick={handleCreate}>Publish</button>
        </div>
      )}

      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          {editing === blog.id ? (
            <div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                rows="6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
              <button onClick={() => handleUpdate(blog.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 120)}...</p>
              <button onClick={() => startEdit(blog)}>Edit</button>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminBlogManager;
