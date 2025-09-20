# 🍬 Sweet Shop Management System

*By Dimple Kundu*

A full-stack Sweet Shop Management System built with FastAPI (Python) and React (Vite), following strict Test-Driven Development (TDD) principles. This application is developed as part of the Incubyte TDD Kata, focusing on clean architecture, comprehensive testing, and modern development practices.

## 🎯 Project Overview

This project implements a complete Sweet Shop Management System as per the Incubyte TDD Kata requirements. The application follows a clean architecture with clear separation of concerns and comprehensive test coverage.

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
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Pytest
- **Database ORM**: SQLAlchemy
- **Migrations**: Alembic

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
- **ChatGPT**: For code suggestions and boilerplate generation, debugging assistance and code optimization and explaining complex code and suggesting improvements
- **Windsurf**: to solve bugs and quickfixes in time ChatGPT revolves around the same fixes again and again
- **Gemini**: to rethink and verify the code given and change the chatgpt errroneous code

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

## 🙏 Acknowledgments

- FastAPI for the amazing backend framework
- React for the frontend library
- All open-source contributors whose work made this project possible
