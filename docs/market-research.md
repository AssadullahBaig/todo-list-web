# Market Research

## 1. Purpose

Before developing the Todo List Full-Stack Application, existing task management applications were analyzed to understand current design trends, common features, and technologies used in modern productivity software.

The goal of this research is to identify best practices that can be incorporated into the project while keeping the application simple enough to support learning modern full-stack development.

---

# 2. Existing Applications

## 2.1 Todoist

### Overview

Todoist is one of the most popular task management applications available today. It focuses on helping users organize personal and professional tasks using projects, priorities, labels, and deadlines.

### Key Features

- Create, edit and delete tasks
- Projects
- Priority levels
- Labels
- Due dates
- Search
- Filters
- Recurring tasks
- Collaboration
- Cross-device synchronization

### Technologies (Publicly Known)

- React (Web)
- TypeScript
- REST APIs
- Cloud Database
- Mobile Applications (iOS & Android)

### Strengths

- Clean and minimal interface
- Excellent user experience
- Powerful organization tools
- Fast performance

### Weaknesses

- Many advanced features require a paid subscription.
- Large number of features may feel overwhelming for new users.

### Features to Adopt

- Clean interface
- Simple task cards
- Search functionality
- Filters
- Priority indicators

---

## 2.2 Microsoft To Do

### Overview

Microsoft To Do is Microsoft's cloud-based task management application integrated with the Microsoft ecosystem.

### Key Features

- Task lists
- Due dates
- Reminders
- Notes
- Daily planner (My Day)
- Cloud synchronization
- Cross-device support

### Technologies (Publicly Known)

- Microsoft Azure
- Cloud Services
- Microsoft Account Authentication

### Strengths

- Very simple user interface
- Excellent synchronization
- Easy to use

### Weaknesses

- Limited customization
- Fewer productivity features compared to Todoist

### Features to Adopt

- Simple navigation
- Clean typography
- Minimal design

---

## 2.3 Trello

### Overview

Trello is a project management application that organizes tasks using Kanban boards.

### Key Features

- Boards
- Lists
- Cards
- Team collaboration
- Labels
- Checklists
- Comments
- Attachments

### Technologies (Publicly Known)

- React
- Node.js
- Cloud Infrastructure

### Strengths

- Excellent visual organization
- Easy drag-and-drop interface
- Great for team collaboration

### Weaknesses

- Less suitable for simple personal task management.
- Can become cluttered for small projects.

### Features to Adopt

- Card-based layout
- Task organization
- Modern user interface

---

## 2.4 Google Tasks

### Overview

Google Tasks is a lightweight task management application integrated with Google Workspace.

### Key Features

- Create tasks
- Subtasks
- Due dates
- Google Calendar integration
- Google account synchronization

### Technologies (Publicly Known)

- Google Cloud
- Google Account Authentication

### Strengths

- Very lightweight
- Easy to use
- Excellent Google integration

### Weaknesses

- Limited features
- No advanced organization tools

### Features to Adopt

- Simplicity
- Quick task creation
- Clean interface

---

# 3. Feature Comparison

| Feature           | Todoist | Microsoft To Do | Trello  | Google Tasks | Proposed Application |
| ----------------- | ------- | --------------- | ------- | ------------ | -------------------- |
| Add Tasks         | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Edit Tasks        | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Delete Tasks      | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Search            | ✓       | ✓               | Limited | Limited      | ✓                    |
| Filters           | ✓       | ✓               | ✓       | ✗            | ✓                    |
| Dark Mode         | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Authentication    | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Database          | ✓       | ✓               | ✓       | ✓            | ✓                    |
| Responsive Design | ✓       | ✓               | ✓       | ✓            | ✓                    |

---

# 4. Design Trends

The research identified several common design practices across modern task management applications.

- Minimal and uncluttered interfaces
- Card-based task layouts
- Responsive design
- Sidebar navigation
- Soft color palettes
- Rounded corners
- Consistent spacing
- Clear typography
- Search functionality
- Dark mode support

These design principles will influence the user interface of the proposed application.

---

# 5. Technologies Used in Modern Todo Applications

The analysis also showed that many modern task management applications share a similar technology stack.

## Frontend

- React
- TypeScript
- HTML
- CSS
- Tailwind CSS

## Backend

- Node.js
- Express.js
- REST APIs

## Databases

- PostgreSQL
- MongoDB
- Firebase
- Supabase

## Authentication

- JWT
- OAuth
- Firebase Authentication
- Supabase Authentication

## Hosting

- Vercel
- Netlify
- AWS
- Azure

---

# 6. Conclusion

The research demonstrates that successful task management applications prioritize simplicity, usability, and performance while offering powerful organizational features.

The proposed Todo List Full-Stack Application will adopt many of these best practices but will focus primarily on learning modern web development concepts. The application will be developed incrementally, allowing each version to introduce new technologies and software engineering principles while maintaining a clean and user-friendly interface.
