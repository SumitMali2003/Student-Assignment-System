# 🎓 Joineazy – Assignment Management System

Joineazy is a modern, role-based assignment management platform designed to simplify academic assignment distribution, submission tracking, and student progress monitoring.

The application provides separate dashboards for administrators and students, allowing administrators to manage assignments while students can access their assigned work and track submission status.

## 🚀 Features

### 👨‍💼 Admin Dashboard
- Secure admin login.
- Create, edit, and delete assignments.
- Add assignment title, description, due date, and Google Drive link.
- Assign assignments to all students or selected students.
- Monitor student submission status.
- Track assignment completion percentage.
- View total assignments, submissions received, and pending submissions.
- Search assignments.

### 👨‍🎓 Student Dashboard
- Student registration and login.
- Personalized student dashboard.
- View only assigned assignments.
- Access Google Drive submission links.
- Confirm assignment submission through a two-step confirmation process.
- Track submitted and pending assignments.
- View overall assignment completion progress.
- Search assigned assignments.
- Identify overdue assignments.

### 🔐 Authentication & Data Management
- Role-based access for administrators and students.
- Registration for new students.
- Login and logout functionality.
- Persistent login sessions.
- Shared assignment state using React Context API.
- Browser-based data persistence using localStorage.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Styling and responsive UI |
| CSS3 | Additional styling |
| Lucide React | Icons |
| React Context API | Shared application state |
| Browser localStorage | Data persistence |
| Git & GitHub | Version control |


## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/joineazy-assignment-dashboard.git
```

### 2. Navigate to the Project Directory

```bash
cd joineazy-assignment-dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit:

```text
http://localhost:5173
```

## 🔑 Demo Credentials

The application includes predefined demo accounts for testing.

**Administrator Accounts**

| Email | Password |
|---|---|
| admin1@joineazy.com | Admin@123 |
| admin2@joineazy.com | Admin@123 |

**Student Accounts**

| Email | Password |
|---|---|
| student1@joineazy.com | Student@123 |
| student2@joineazy.com | Student@123 |
| student3@joineazy.com | Student@123 |
| student4@joineazy.com | Student@123 |
| student5@joineazy.com | Student@123 |

New students can also register through the registration page.

## 🔄 Application Workflow

1. Administrators sign in to the Admin Dashboard.
2. Administrators create assignments with descriptions, deadlines, and Google Drive links.
3. Assignments are distributed to all students or selected students.
4. Students sign in and view their assigned assignments.
5. Students open the provided Google Drive link to submit their work.
6. Students confirm their submission through the application.
7. The submission status is updated.
8. Administrators can monitor student submissions and overall progress.

## 📊 Key Functionalities

- **Assignment Management:** Complete assignment CRUD operations.
- **Role-Based Dashboards:** Separate interfaces for administrators and students.
- **Submission Tracking:** Track individual student submission statuses.
- **Progress Monitoring:** Dynamically calculate assignment completion percentages.
- **Responsive Design:** Interface designed for desktop, tablet, and mobile devices.
- **Data Persistence:** Preserve application data using browser localStorage.

## ⚠️ Current Implementation Notes

- This project uses browser localStorage for authentication and application data persistence.
- It does not currently use a backend server or centralized database.
- Data is browser-specific and is not automatically synchronized across different devices.
- Google Drive links are used for external assignment submission.
- Students manually confirm their submissions within Joineazy.
- The application does not directly upload or verify files on Google Drive.
- Authentication is implemented as a demonstration workflow and is not intended for production security.


## 🔮 Future Enhancements

- Backend integration using Node.js and Express.js.
- MongoDB database integration.
- Secure authentication and authorization.
- Direct file upload functionality.
- Email notifications for new assignments and upcoming deadlines.
- Assignment feedback and grading system.
- Centralized data synchronization.

## 👨‍💻 Author

**Sumit Mali**

## 🌐 Live Demo

**Live Application:** https://flourishing-puffpuff-d67826.netlify.app
Explore the application and experience the Admin and Student dashboards.
