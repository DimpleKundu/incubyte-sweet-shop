# 🍬 Sweet Shop Management System

*By Dimple Kundu*
## Deployment on Render: https://incubyte-sweet-shop-1.onrender.com/

A full-stack Sweet Shop Management System built with FastAPI (Python) and React (Vite), following strict Test-Driven Development (TDD) principles. This application is developed as part of the Incubyte TDD Kata, focusing on clean architecture, comprehensive testing, and modern development practices.

## 🎯 Project Overview

This project implements a complete Sweet Shop Management System as per the Incubyte TDD Kata requirements. The application follows a clean architecture with clear separation of concerns and comprehensive test coverage.
## 🖼️ Screenshots

1. **Main Landing Page**
   
   ![App.jsx](https://github.com/user-attachments/assets/8bd41d57-608e-4482-b281-9d1791e5fb7f)

2. **Register Page**
   
   ![Register](https://github.com/user-attachments/assets/1b8c63e9-f9c4-41ef-bad5-b15619bbba82)

3. **Login Page**
   
   ![Login](https://github.com/user-attachments/assets/3141f1b1-c577-48d9-914a-c77cbbf86975)

4. **Non-Admin Dashboard**
   
   ![Dashboard User](https://github.com/user-attachments/assets/37724b28-501a-44af-a1a2-4c9b70947722)

5. **Admin Dashboard**
   
   ![Admin Dashboard](https://github.com/user-attachments/assets/bc80995a-062c-4093-9fb4-6f817f5202e6)


## 🚀 Features

### Backend (FastAPI)
- **RESTful API**: Fully documented endpoints following OpenAPI specification
- **JWT Authentication**: Secure token-based authentication
- **Database Operations**: CRUD operations for sweets and inventory management
- **Input Validation**: Request validation using Pydantic models
- **Testing**: Comprehensive test suite with pytest

### Frontend (React + Vite)
- **User Authentication**: Registration and login forms with form validation
- **Sweet Management**: Intuitive interface for managing sweet items
- **Real-time Updates**: React Query for efficient data fetching and state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role-based UI**: Different views for admin and regular users

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.9+)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Pytest

### Frontend
- **Framework**: React 18
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Routing**: React Router

## 🚀 Getting Started

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd sweet-shop-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   # or
   source .venv/bin/activate  # On macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   # Create a .env file with your configuration
   # Example:
   DATABASE_URL=postgresql://user:password@localhost/sweet_shop
   SECRET_KEY=your-secret-key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Run database migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd sweet-shop-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🤖 My AI Usage

### Tools Used
- **GitHub Copilot**: For code suggestions and boilerplate generation
- **ChatGPT**: For debugging assistance and code optimization
- **GitHub Copilot Chat**: For explaining complex code and suggesting improvements

### How I Used AI in This Project
1. **TDD Implementation**:
   - Used AI to generate initial test cases following the Red-Green-Refactor cycle
   - Leveraged Copilot to suggest test assertions and edge cases
   - Example: Generated test stubs for all API endpoints before implementation

2. **Backend Development**:
   - Created FastAPI route handlers with proper request/response models
   - Implemented JWT authentication with AI assistance
   - Generated database models and migration scripts

3. **Frontend Development**:
   - Used AI to create React components following best practices
   - Implemented form validation and error handling with AI suggestions
   - Generated API client code for frontend-backend communication

4. **Documentation**:
   - Created comprehensive docstrings and API documentation

### Impact on Workflow
AI tools significantly enhanced the development process by:
- Accelerating the TDD cycle with faster test generation
- Providing instant feedback on code quality and potential improvements
- Reducing boilerplate code, allowing focus on business logic
- Suggesting optimizations for both frontend and backend code
- Helping identify and fix bugs more efficiently

### Example AI-Assisted Commit
```
feat: Implement JWT authentication

- Added user registration and login endpoints
- Implemented token generation and validation
- Added protected routes with role-based access control

Co-authored-by: GitHub Copilot <copilot@github.com>
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FastAPI for the amazing backend framework
- React for the frontend library
- All open-source contributors whose work made this project possible
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 4a5b84c (feat: Add complete frontend pages (Dashboard, Login, Register) with UI logic and state management)
