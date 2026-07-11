# System Architecture

## 1. Introduction

This document describes the architecture of the Todo List Full-Stack Application throughout its development lifecycle.

The application is intentionally developed in multiple versions, with each version introducing new technologies and architectural concepts. This approach allows the project to evolve from a simple frontend application into a modern full-stack web application while maintaining a clear understanding of each architectural stage.

---

# 2. Architectural Goals

The architecture of the application is designed to achieve the following goals:

- Keep the code modular and maintainable.
- Separate frontend and backend responsibilities.
- Follow modern React development practices.
- Build reusable components.
- Support future scalability.
- Allow new features to be added incrementally.
- Provide a clean and organized project structure.

---

# 3. Project Structure

```
todo-list-fullstack/
│
├── web/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public/
│
├── backend/
│
└── docs/
```

The project separates the frontend, backend, and documentation into independent directories, making the application easier to maintain and expand.

---

# 4. Architecture Evolution

The architecture evolves throughout the project as additional technologies are introduced.

## Version 1 – React Frontend

```
User
   │
   ▼
React Application
```

Description:

- React renders the user interface.
- Todos exist only in React state.
- Data is lost after refreshing the browser.

---

## Version 2 – Local Storage

```
User
   │
   ▼
React
   │
   ▼
Local Storage
```

Description:

- React stores tasks inside the browser.
- Tasks persist after refreshing.
- No backend server is required.

---

## Version 3 – Multi-Page React Application

```
User
   │
   ▼
React
   │
React Router
   │
   ├── Dashboard
   ├── Todo
   ├── Settings
   └── About
```

Description:

- Client-side routing is introduced.
- The application becomes a multi-page web application.
- Navigation is handled using React Router.

---

## Version 4 – Backend API

```
User
   │
   ▼
React Frontend
   │
HTTP Requests
   │
   ▼
Express API
   │
In-Memory Data
```

Description:

- React communicates with the Express backend.
- Local Storage is removed.
- Todos are stored temporarily in server memory.
- REST APIs are introduced.

---

## Version 5 – Database Integration

```
User
   │
   ▼
React Frontend
   │
HTTP Requests
   │
   ▼
Express API
   │
SQL Queries
   │
   ▼
PostgreSQL (Supabase)
```

Description:

- Express connects to a PostgreSQL database hosted on Supabase.
- Todos are stored permanently.
- Data remains available across sessions.

---

## Version 6 – Authentication

```
                 User
                   │
                   ▼
          React Frontend
                   │
             HTTP Requests
                   │
                   ▼
             Express API
              │         │
              │         │
              ▼         ▼
      Supabase Auth   PostgreSQL
```

Description:

- Users create accounts and log in securely.
- Authentication is handled by Supabase.
- Each user can only access their own tasks.
- Protected routes prevent unauthorized access.

---

# 5. Technology Stack

## Frontend

- React
- JavaScript
- Tailwind CSS
- React Router

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- Supabase

## Authentication

- Supabase Authentication

## Version Control

- Git
- GitHub

---

# 6. Design Principles

The project follows several software engineering principles:

### Component-Based Architecture

The user interface is divided into reusable React components, reducing duplication and improving maintainability.

### Separation of Concerns

The frontend, backend, database, and authentication services are separated into distinct layers, making the application easier to understand and extend.

### Incremental Development

Each version builds upon the previous one, introducing new concepts while preserving existing functionality.

### Reusability

Reusable components, utility functions, and services minimize duplicated code and improve maintainability.

---

# 7. Future Architecture

Possible future improvements include:

- Task categories
- Priority levels
- Due dates
- Notifications
- Drag-and-drop task ordering
- Team collaboration
- Real-time synchronization
- Progressive Web App (PWA) support

These features are beyond the scope of the current project but could be added in future versions.
