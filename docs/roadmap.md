# Project Roadmap

## 1. Overview

The Todo List Full-Stack Application will be developed incrementally through multiple versions. Each version introduces new technologies and software engineering concepts while expanding the application's functionality.

This approach ensures that every stage builds upon the previous one, allowing the project to evolve from a simple frontend application into a complete production-ready full-stack web application.

---

# Version 1 – React Fundamentals

## Objective

Build the first working version of the Todo application using React.

## Concepts

- JSX
- Components
- Props
- State Management (`useState`)
- Event Handling

## Features

- Add Todo
- Delete Todo
- Mark Todo as Complete

## Expected Outcome

By the end of this version, users will be able to create and manage a simple todo list using React state.

---

# Version 2 – Local Persistence & User Experience

## Objective

Improve the user experience and persist application data.

## Concepts

- `useEffect`
- Local Storage
- Controlled Components

## Features

- Save Todos
- Edit Todos
- Search Todos
- Filter Todos
- Dark Mode

## Expected Outcome

Todos will remain available after refreshing the browser, and users will have additional tools to organize their tasks.

---

# Version 3 – Multi-Page Application

## Objective

Transform the application into a multi-page React application.

## Concepts

- React Router
- Navigation
- Layout Components
- Client-Side Routing

## Features

- Dashboard Page
- Todo Page
- Settings Page
- About Page
- Navigation Bar

## Expected Outcome

The application will have a structured navigation system and a more scalable frontend architecture.

---

# Version 4 – Backend Development

## Objective

Replace Local Storage with a backend API.

## Concepts

- Express.js
- REST APIs
- HTTP Methods
- CRUD Operations
- JSON

## Features

- Retrieve Todos from API
- Create Todos
- Update Todos
- Delete Todos

## HTTP Methods

- GET
- POST
- PUT
- DELETE

## Expected Outcome

The frontend will communicate with an Express backend, introducing the client-server architecture.

---

# Version 5 – Database Integration

## Objective

Store application data permanently in a PostgreSQL database.

## Concepts

- PostgreSQL
- SQL
- CRUD Operations
- Database Relationships

## Features

- Persistent Todo Storage
- Database Queries
- Improved Data Management

## Expected Outcome

Application data will be stored securely in a relational database instead of server memory.

---

# Version 6 – Authentication & Authorization

## Objective

Allow users to securely manage their own personal todo lists.

## Concepts

- Authentication
- Authorization
- JWT
- Sessions
- Protected Routes

## Features

- User Registration
- User Login
- User Logout
- User-Specific Todos
- Protected Pages

## Expected Outcome

Each user will have their own secure account and personal todo list.

---

# Future Enhancements

The following features are outside the scope of the initial project but may be implemented in future versions.

## Version 7 – Productivity Features

- Task Categories
- Priority Levels
- Due Dates
- Notifications
- Drag-and-Drop Sorting

---

## Version 8 – Deployment

### Frontend

- Deploy to Vercel

### Backend

- Deploy Express API

### Database

- Supabase PostgreSQL

### Additional Tasks

- Environment Variables
- Production Configuration
- Performance Optimization

---

# Learning Progression

| Version   | Main Focus               | Technologies         |
| --------- | ------------------------ | -------------------- |
| Version 1 | React Fundamentals       | React                |
| Version 2 | State Persistence        | React, Local Storage |
| Version 3 | Application Architecture | React Router         |
| Version 4 | Backend Development      | Express.js           |
| Version 5 | Database Integration     | PostgreSQL, Supabase |
| Version 6 | Authentication           | Supabase Auth        |
| Version 7 | Advanced Features        | React + Backend      |
| Version 8 | Deployment               | Vercel, Supabase     |

---

# Success Criteria

The project will be considered complete when it meets the following objectives:

- A responsive and user-friendly interface.
- A well-structured React frontend.
- A RESTful Express backend.
- PostgreSQL database integration.
- Secure user authentication.
- Deployment to a public hosting platform.
- Clean, maintainable, and documented source code.
