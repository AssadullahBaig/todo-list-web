# Project Roadmap

## 1. Overview

The Todo List Full-Stack Application will be developed incrementally through multiple versions. Each version introduces new technologies and software engineering concepts while expanding the application's functionality.

This approach ensures that every stage builds upon the previous one, allowing the project to evolve from a simple frontend application into a complete production-ready full-stack web application.

---

Version 1 – React Basics Completed

## Objective

Create the first version of the application and become familiar with the basics of React.

## Work Completed

- Set up the project using Vite.
- Configured Tailwind CSS.
- Created a clean project folder structure.
- Built the main application layout.
- Created reusable components:
  - MainLayout
  - Sidebar
  - Header
  - Todo Header
  - Todo Card
  - Todo List
- Displayed hardcoded tasks.
- Deployed the project to GitHub Pages.

## Concepts Learned

- JSX
- Components
- Props
- Project Structure

---

# Version 2 – Task Management Completed

## Objective

Allow users to fully manage their tasks using React state.

## Work Completed

- Implemented `useState` to manage tasks.
- Converted the form into a controlled component.
- Added new tasks.
- Deleted existing tasks.
- Marked tasks as completed.
- Edited existing tasks.

## Work Remaining

- Open and close the task form using the sidebar button.
- Improve form validation.
- Add task search.
- Add task filters.
- Improve the overall user interface.

## Concepts Learned

- `useState`
- Event Handling
- Controlled Components
- Updating arrays and objects in state

# Version 3 – User Experience Improvements In Progress

## Objective

Improve the overall user experience by making the interface cleaner and easier to interact with.

## Work Completed

- Connected the sidebar **New Task** button to show and hide the task form.
- Automatically closed the form after adding a task.
- Automatically opened the form when editing a task.
- Added a search bar to search tasks by title.
- Added task filters (All, Active, Completed).

## Work Remaining

- Improve form validation.
- Display better feedback for invalid input.
- Disable submission when required fields are empty.

## Concepts Learned

- Component Communication
- Lifting State
- Conditional Rendering
- Filtering Data
- Controlled Inputs

---

# Version 4 – Local Storage

## Objective

Save tasks in the browser so they remain available after refreshing or reopening the application.

## Planned Work

- Save todos to Local Storage.
- Load saved todos when the application starts.
- Update Local Storage whenever tasks change.

## Concepts to Learn

- useEffect
- Local Storage
- Data Persistence
- Side Effects in React

---

# Version 5 – Productivity Features

## Objective

Expand the application with additional productivity and usability features while continuing to work mainly on the frontend before introducing the backend and database.

## Work Completed

- Added task sorting.
- Added sorting options:
  - Newest
  - Oldest
  - Due Date
  - Priority
  - A → Z
  - Z → A
- Added due times to tasks.
- Added visual due-date status:
  - Due today
  - Due tomorrow
  - Due in X days
  - Overdue
- Added color coding for due-date status.
- Added color coding for task priorities.
- Added completion animations.
- Made task cards smaller and more compact.
- Added the application version number to the sidebar.
- Added a `+` icon to the New Task button.
- Improved the overall Todo page layout and task presentation.
- Added a GitHub Actions deployment pipeline to automatically build and deploy the application to GitHub Pages when changes are pushed.

## Work Remaining

- Improve the overall UI.
- Add task lists such as Inbox, Work, Personal, etc.
- Add labels/tags.
- Add subtasks.
- Add comments.
- Add reminders.
- Add recurring tasks.
- Improve task ordering and drag-and-drop functionality.
- Improve the New Task interface.
- Research better task creation screens/modals.
- Add pagination when the number of tasks becomes large.
- Create the `DISCOVER` file for future feature ideas.
- Study React Clean Architecture.
- Separate rendering/UI from application logic.
- Improve the project structure and code organization.
