import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import PublicServices from './pages/PublicServices';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import BookConsultation from './components/BookConsultation';

// Admin Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminServices from './pages/AdminServices';
import AdminBlogManager from './pages/AdminBlogManager';

// User Page
import UserDashboard from './pages/dashboard/UserDashboard';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<PublicServices />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/consultation" element={<BookConsultation />} />

        {/* 🔐 Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminBlogManager />
            </ProtectedRoute>
          }
        />

        {/* 👤 User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ Unauthorized and 404 */}
        <Route path="/unauthorized" element={<p>Access Denied</p>} />
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
