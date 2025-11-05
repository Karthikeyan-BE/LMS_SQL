# LMS_SQL - Library Management System

## 📚 Project Overview

LMS_SQL is a full-stack Library Management System built with modern web technologies. This application provides a comprehensive solution for managing library operations including books, members, borrowing/returning books, reservations, and fine management. The system uses SQL database for data persistence and provides an intuitive user interface for librarians and administrators.

## 🚀 Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **React Router** - Client-side routing
- **Axios** - Promise-based HTTP client
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL/SQL** - Relational database management
- **Sequelize** - ORM for SQL databases
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware

### DevOps
- **GitHub Actions** - CI/CD automation
- **Node.js workflows** - Automated testing and deployment

## 📁 Project Structure

```
LMS_SQL/
│
├── .github/
│   └── workflows/          # CI/CD workflow configurations
│       ├── Node.yml
│       └── node.js.yml
│
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── Components/    # React components
│   │   │   ├── Borrowing/ # Borrowing-related components
│   │   │   ├── CSS/       # Component stylesheets
│   │   │   ├── Books.jsx  # Books management
│   │   │   ├── Borrowing.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Fine.jsx   # Fine management
│   │   │   ├── Home.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── Members.jsx # Member management
│   │   │   ├── NavBar.jsx
│   │   │   ├── Reservation.jsx
│   │   │   └── SideBar.jsx
│   │   ├── assets/        # Images and media files
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css
│   │   ├── main.jsx       # Application entry point
│   │   └── index.css
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── Controller/        # Business logic controllers
│   │   ├── bookController.js
│   │   ├── borrowController.js
│   │   ├── fineController.js
│   │   ├── reservationController.js
│   │   └── userController.js
│   ├── Database/          # Database configuration
│   │   └── dbConnect.js   # Database connection setup
│   ├── Model/             # Sequelize data models
│   │   ├── bookModel.js
│   │   ├── borrowModel.js
│   │   ├── fineModel.js
│   │   ├── reservationModel.js
│   │   ├── userModel.js
│   │   └── index.js       # Model exports
│   ├── Routes/            # API route definitions
│   ├── .env               # Environment variables
│   ├── index.js           # Server entry point
│   ├── package.json       # Backend dependencies
│   └── package-lock.json
│
└── package.json           # Root package.json for scripts
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database server
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karthikeyan-BE/LMS_SQL.git
   cd LMS_SQL
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=library_management
   DB_DIALECT=mysql
   ```

5. **Setup Database**
   - Create a MySQL database named `library_management` (or your chosen name)
   - The Sequelize models will auto-create tables on first run

6. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

## 🎯 Usage

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   # or for development with nodemon
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Application will open on `http://localhost:5173` (Vite default)

3. **Access the Application**
   - Open your browser and navigate to the frontend URL
   - The application will communicate with the backend API

### Production Build

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd server
   npm start
   ```

## ✨ Key Features

### 📖 Book Management
- Add, edit, and delete books
- Search and filter books by various criteria
- Track book availability status
- View detailed book information

### 👥 Member Management
- Register new library members
- Update member information
- View member borrowing history
- Manage member status

### 📚 Borrowing System
- Issue books to members
- Return books
- Track due dates
- View active borrowings
- Borrowing history

### 🎫 Reservation System
- Reserve books that are currently borrowed
- Queue management for popular books
- Notification system for reserved books

### 💰 Fine Management
- Automatic fine calculation for overdue books
- Fine payment tracking
- View outstanding fines
- Fine history and reports

### 🏠 Dashboard
- Overview of library statistics
- Quick access to main features
- Visual representation of library data

### 🎨 User Interface
- Responsive design
- Intuitive navigation with sidebar and navbar
- Clean and modern UI
- Error handling and user feedback

## 🤝 Contribution Guide

We welcome contributions to the LMS_SQL project! Here's how you can contribute:

### Getting Started

1. **Fork the repository**
   - Click the 'Fork' button at the top right of this page

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/LMS_SQL.git
   cd LMS_SQL
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Making Changes

1. **Make your changes**
   - Follow the existing code style and conventions
   - Write clear, commented code
   - Test your changes thoroughly

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**
   - Go to the original repository
   - Click 'New Pull Request'
   - Select your fork and branch
   - Describe your changes in detail

### Contribution Guidelines

- **Code Style**: Follow JavaScript/React best practices
- **Commits**: Use clear, descriptive commit messages
- **Documentation**: Update README if you change functionality
- **Testing**: Ensure all features work before submitting PR
- **Issues**: Check existing issues before creating new ones

### Reporting Bugs

- Use the GitHub Issues tab
- Describe the bug in detail
- Include steps to reproduce
- Mention your environment (OS, Node version, etc.)

### Suggesting Features

- Open an issue with the 'Feature Request' label
- Clearly describe the feature and its benefits
- Discuss implementation approaches

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Karthikeyan-BE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Karthikeyan-BE**
- GitHub: [@Karthikeyan-BE](https://github.com/Karthikeyan-BE)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Built with modern web technologies and best practices
- Inspired by real-world library management needs

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact the maintainer through GitHub

## 🔄 Version History

- **v1.0.0** - Initial Release
  - Core library management features
  - Book, member, and borrowing management
  - Reservation and fine systems
  - CI/CD integration with GitHub Actions

---

⭐ If you find this project helpful, please consider giving it a star!

Made with ❤️ by Karthikeyan-BE
