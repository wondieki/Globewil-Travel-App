# GlobeWil Travel Consultancy System

**GlobeWil Travel Consultancy** is a comprehensive web platform developed to manage and streamline travel services such as visa consultations, interview coaching, school search support for studying abroad, service bookings, and post-relocation assistance. It is built using React.js for the frontend and Flask for the backend with a focus on user experience, admin control, and scalability.

---

## 🔧 Project Overview

This system allows travelers to:

* Book consultations for visa and relocation assistance
* Access helpful blog content about studying or relocating abroad
* Communicate with consultants via a message system
* Receive continued support even after traveling

It also enables admins to:

* Manage all bookings
* Create, edit, and delete services
* Publish and manage blogs
* View and respond to client messages

---

## 🔬 Tech Stack

### Frontend:

* React.js (with React Router)
* Axios for API calls
* Context API for authentication state
* Plain CSS for styling

### Backend:

* Flask with Blueprint routing
* Flask-JWT-Extended for authentication
* SQLAlchemy ORM with Flask-Migrate
* SQLite (development) / PostgreSQL (production)
* Flask-CORS

---

## 📄 Core Features

### User Side

* Secure user registration and login
* JWT-based authentication (stored in cookies)
* Book consultation appointments with one or more services
* View own bookings in user dashboard
* Access blogs and travel articles
* Submit general inquiries

### Admin Side

* Admin login (with protected dashboard)
* View and manage all bookings
* Create, update, delete travel services
* Manage blog posts (CRUD)
* View user messages

---

## 🌐 Key Modules

### Services Management

Users can browse available services, including:

1. Visa Documentation Preparation
2. Visa Interview Coaching
3. School Search and Study Abroad Support
4. Flight Booking and Ticketing
5. Post-Relocation Support
6. Appeals and Reapplications Guidance

### Blog System

* Admins can post blogs with travel advice, success stories, and updates
* Public users can read posts from the blog page

### Booking System

* Logged-in or guest users can create bookings
* Admins can see all bookings
* Bookings support many-to-many relation with services and users

### Messaging

* Public users can submit inquiries
* Admins can view messages

---

## 🔍 API Endpoints Overview

| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| POST   | /register | Register a new user           |
| POST   | /login    | Login and receive JWT         |
| GET    | /services | List available services       |
| POST   | /bookings | Submit new booking            |
| GET    | /bookings | View user or all bookings     |
| GET    | /blogs    | List blog posts               |
| POST   | /blogs    | Create blog post (admin only) |
| GET    | /messages | Admin fetch messages          |

---

## 📊 Database Models (Simplified)

### User

* id, name, email, password, role

### Service

* id, name, description

### Booking

* id, full\_name, email, phone, date, time, booking\_type, country, notes
* Relationships: many-to-many with users and services

### Blog

* id, title, content, created\_at

### Message

* id, name, email, content

---

## 📆 Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/globewil-travel.git
cd globewil-travel
```

### 2. Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
flask db init
flask db migrate
flask db upgrade
flask run
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🎓 Sample Blogs You Can Include

1. "Visa Approved! 7 Expert Tips That Actually Work"
2. "First Time Abroad? Here's What No One Tells You"
3. "How to Choose the Right School Abroad"
4. "What's in Your Travel Folder? Must-Have Docs"
5. "From Denied to Approved: Real Visa Comebacks"
6. "Arrival Checklist: First 72 Hours in a New Country"

---

## ✉️ Contact

**Developer:** Wilder Kerubo Ondieki
**Business:** GlobeWil Travel Consultancy
**Email:** [your-email@example.com](mailto:your-email@example.com)
**Website:** [https://globewil.com](https://globewil.com)

---

> This system was built to improve how travelers plan, prepare, and transition into new destinations with reliable, structured support. Powered by modern technologies and designed for real-world client engagement.
