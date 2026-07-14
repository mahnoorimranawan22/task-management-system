# 📋 Task Management System

A modern **Full Stack Task Management System** built with **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**. This application allows users to securely manage their daily tasks with authentication, task organization, search, filtering, and a responsive dashboard.

---

## 🚀 Live Demo

> Add your deployed application link here.

https://task-management-system-noors.netlify.app/

---

# ✨ Features

### 👤 User Authentication

* User Registration
* User Login
* Secure JWT Authentication
* Password Encryption using bcrypt
* Protected Routes
* Logout

### 📋 Task Management

* Create Tasks
* View Tasks
* Edit Tasks
* Delete Tasks
* Mark Tasks as Complete
* Due Dates
* Task Priorities
* Categories
* Tags

### 🔍 Search & Filters

* Search Tasks
* Filter by Priority
* Filter by Status
* Sort Tasks
* Pagination

### 📊 Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Task Analytics

### ⚙️ User Features

* Profile Management
* Settings
* Dark Mode
* Responsive Dashboard

### 🎨 User Interface

* Responsive Design
* Modern Dashboard
* Glassmorphism UI
* Toast Notifications
* Loading Spinner
* Mobile Friendly

---

# 🛠️ Technologies Used

## Frontend

* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Token)
* bcryptjs

## Other Packages

* dotenv
* cors
* validator
* multer (if profile image upload is implemented)

---

# 📁 Project Structure

```text
task-management-system/

├── client/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── settings.html
│   ├── calendar.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
```

Move into the project directory:

```bash
cd task-management-system
```

---

## Install Backend Dependencies

```bash
cd server
npm install
```

---

## Create Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Start the Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## Open the Frontend

Open the `client` folder in your preferred local server or development environment and access `index.html`.

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

## Tasks

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | /api/tasks              | Get All Tasks      |
| GET    | /api/tasks/:id          | Get Single Task    |
| POST   | /api/tasks              | Create Task        |
| PUT    | /api/tasks/:id          | Update Task        |
| PATCH  | /api/tasks/:id/complete | Mark Task Complete |
| DELETE | /api/tasks/:id          | Delete Task        |

---

# 🔒 Security Features

* Password Hashing
* JWT Authentication
* Protected Routes
* Environment Variables
* Request Validation
* Secure User Sessions

---

# 📚 What I Learned

This project helped me strengthen my understanding of:

* Frontend Development
* Backend Development
* REST API Design
* Node.js
* Express.js
* MongoDB
* Mongoose
* User Authentication
* CRUD Operations
* Responsive Web Design
* Git & GitHub

---

# 🚀 Future Improvements

* Email Verification
* Password Reset
* Real-Time Notifications
* Team Collaboration
* Task Sharing
* File Attachments
* Calendar Integration
* Admin Dashboard
* Docker Support
* Automated Testing

---

# 👩‍💻 Author

**Mahnoor Imran**

BS Software Engineering Student

GitHub: https://github.com/mahnoorimranawan22

LinkedIn:https://www.linkedin.com/in/mahnoor-imran-8612b5375/

Portfolio: https://mahnoorimranawan22.github.io/portfolio/

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
