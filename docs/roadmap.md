# Version 7 – Subtasks & Task Details

**Status:** Completed

## Objective

Make bigger tasks easier to manage.

## Work Completed

- Added subtasks.
- Added subtask editing and deleting.
- Added independent subtask completion.
- Added subtask progress.
- Added expand/collapse for subtasks.
- Added subtask search.
- Added task notes/details.
- Added notes to create and edit.
- Added notes to search.
- Kept subtasks working with recurring tasks.
- Kept subtasks and notes saved in LocalStorage.

---

# Version 6 – Recurring Tasks & Bulk Task Actions

**Status:** Completed

## Objective

Make repeated tasks and managing multiple tasks easier.

## Work Completed

- Added recurring tasks:
  - Daily
  - Weekly
  - Monthly
- Added recurrence info to task cards.
- Made recurring tasks move forward when completed.
- Added task selection mode.
- Added selected task count.
- Added bulk complete.
- Added bulk edit.
- Added bulk pin.
- Added bulk delete.
- Added Undo for bulk delete.
- Added Select Visible.
- Added Clear Selection.

---

# Version 5 – Productivity Features

**Status:** Completed

## Objective

Turn the basic Todo application into a more useful productivity tool.

## Work Completed

- Added task sorting:
  - Newest
  - Oldest
  - Due Date
  - Priority
  - A → Z
  - Z → A
- Added due times.
- Added due-date statuses:
  - Due today
  - Due tomorrow
  - Due in X days
  - Overdue
- Added an overdue task section.
- Added priority colors and priority filtering.
- Added labels.
- Added pin / favorite tasks with pinned-first ordering.
- Added task completion animations.
- Added productivity completion progress.
- Improved empty states, focus states, spacing, and compact task cards.
- Added GitHub Actions deployment to GitHub Pages.

## Concepts Learned

- Sorting Arrays
- Date Handling
- Derived State
- Filtering
- UI State
- Deployment Automation

---

# Version 4 – Local Storage

**Status:** Completed

## Objective

Keep tasks available after refreshing or reopening the application.

## Work Completed

- Saved todos to Local Storage.
- Loaded saved todos when TaskFlow starts.
- Updated Local Storage whenever todo state changes.

## Concepts Learned

- `useEffect`
- Local Storage
- Data Persistence
- Side Effects

---

# Version 3 – User Experience Improvements

**Status:** Completed

## Objective

Improve the task management experience and make tasks easier to find.

## Work Completed

- Connected the sidebar New Task button to the task form.
- Automatically closed the form after creating a task.
- Automatically opened the form when editing a task.
- Added task search.
- Added All, Active, and Completed filters.
- Added clearer empty states and filter feedback.

## Concepts Learned

- Component Communication
- Lifting State
- Conditional Rendering
- Filtering Data
- Controlled Inputs

---

# Version 2 – Task Management

**Status:** Completed

## Objective

Allow users to manage tasks using React state.

## Work Completed

- Added React state for tasks.
- Converted the task form into a controlled component.
- Added new tasks.
- Edited existing tasks.
- Deleted tasks.
- Added Undo after deleting a task.
- Completed and uncompleted tasks.

## Concepts Learned

- `useState`
- Event Handling
- Controlled Components
- Updating Arrays and Objects

---

# Version 1 – React Basics

**Status:** Completed

## Objective

Create the first working version of TaskFlow and learn the basic React workflow.

## Work Completed

- Set up the project with Vite.
- Configured Tailwind CSS.
- Created the initial project structure.
- Built the main application layout.
- Created reusable components:
  - MainLayout
  - Sidebar
  - Header
  - TodoHeader
  - TodoCard
  - TodoList
- Displayed the first hardcoded tasks.
- Deployed the project to GitHub Pages.

## Concepts Learned

- JSX
- Components
- Props
- Basic Project Structure
