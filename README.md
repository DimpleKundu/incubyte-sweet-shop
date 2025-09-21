# 🍬 Sweet Shop Management System

*By Dimple Kundu*
**Live Deployment:** [Render](https://incubyte-sweet-shop-1.onrender.com/)

A full-stack Sweet Shop Management System built with **FastAPI (Python)** and **React (Vite)**, following strict **Test-Driven Development (TDD)** principles. This project was developed as part of the Incubyte TDD Kata, focusing on clean architecture, comprehensive testing, and modern development practices.

---

## 🎯 Project Overview

This project implements a complete Sweet Shop Management System with clear separation of concerns and full test coverage. Users can browse and purchase sweets, while admins can manage inventory and sweet items.

---

## 🚀 Features

### Backend (FastAPI)

* **RESTful API** with OpenAPI documentation
* **JWT Authentication** for secure access
* **CRUD operations** for sweets and inventory management
* **Input Validation** using Pydantic
* **Testing** with Pytest

### Frontend (React + Vite)

* **User Authentication**: Registration and login with validation
* **Sweet Management**: Add, update, delete, and restock (admin only)
* **Role-Based UI**: Admin vs regular user views
* **Responsive Design**: Mobile-first approach using Tailwind CSS
* **Real-Time Updates** using React Query

---

## 🛠️ Tech Stack

**Backend:** FastAPI, Python 3.9+, MongoDB Atlas, JWT, Pytest
**Frontend:** React 18, Vite, Tailwind CSS, React Query, React Router, React Hook Form

---

## 🚀 Getting Started

You can run the project in **two ways**:

### 1️⃣ Running Locally

#### Backend

```bash
cd sweet-shop-backend
python -m venv .venv
# Activate environment:
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux

pip install -r requirements.txt

# Set up your .env file with MongoDB Atlas URI
# Example:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sweetshop?retryWrites=true&w=majority
# SECRET_KEY=your-secret-key
# ACCESS_TOKEN_EXPIRE_MINUTES=30

uvicorn app.main:app --reload
```

#### Frontend

```bash
cd sweet-shop-frontend
npm install
npm run dev
# Visit http://localhost:3000
```

---

### 2️⃣ Running via Docker Container

#### Prerequisites

* Docker and Docker Compose installed
* `.env` files for backend with MongoDB URI

#### Start Containers

```bash
docker-compose up --build
```

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend:** [http://localhost:8000/docs](http://localhost:8000/docs)

> MongoDB is still **hosted on Atlas**, not in the container. This ensures credentials are never exposed publicly.

---

## 🤖 AI Usage

The entire project—from backend to frontend UI—was primarily developed using **GPT-5**, with **Windsurf** assisting only in generating backend routing boilerplate.  
AI was leveraged for debugging, code optimization, creating frontend logic, generating TDD test stubs, and writing comprehensive documentation.


---

## 🙏 Acknowledgments

* **FastAPI** for backend
* **React** for frontend
* Open-source contributors
