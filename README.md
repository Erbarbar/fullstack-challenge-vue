# 🚀 Full-Stack Analytics Challenge

### Author: Filipe Pinto Lopes

### Role: Frontend Developer Candidate

This repository contains a complete, containerized solution for the **Full-Stack Dashboard Exercise**. The project implements a robust data pipeline that ingests external JSON data (via DummyJSON), processes it through a Python/Django backend, and presents real-time analytics via a modern Vue.js frontend.

## 🏗️ System Architecture

The application follows a **Data Proxy & Domain-Driven** architecture, ensuring high performance and scalability:

*   **Frontend (Vue.js 3):** A reactive dashboard built with Vite, featuring dynamic data visualization and advanced filtering/sorting capabilities.
*   **Backend (Python/Django REST Framework):** Acts as the orchestrator and "Single Source of Truth." It manages the heavy-duty data transformations and provides a clean, domain-specific API to the frontend.
*   **Database (PostgreSQL 15):** A relational store that transforms flat JSON payloads into structured, queryable entities (User/Product relationships).
*   **Orchestration (Docker Compose):** A single-command setup that wires together the web servers, database, and networking.

---


## 🚀 Quick Start Guide

The project is designed to be "Zero-Config." As long as you have **Docker** and **Docker Compose** installed, you can run the entire stack with a single command.

**Requirement:** Docker Desktop installed and running.

```
docker-compose up --build
```

Once the containers are healthy, the application is available at:

**Frontend UI:** http://localhost:5173

**Backend API:** http://localhost:8000/api/



## Project Structure
```
├── backend/            # Django application (API, Models, Services, Migrations)
├── frontend/           # Vue.js SPA (Components, Views, Stores)
├── docker-compose.yml  # Multi-container orchestration
└── .env                # Environment configuration (Database credentials, etc.)
```
