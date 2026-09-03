# Version 7 – Subtasks & Task Details

**Status:** Planned

## Objective

Allow larger tasks to be broken into smaller pieces.

## Planned Work

- Add subtasks.
- Allow subtasks to be completed independently.
- Add simple task comments or notes.

## Concepts to Learn

- Nested Data
- Updating Nested State
- Parent / Child Task Relationships

---

# Version 6 – Recurring Tasks & Bulk Task Actions

**Status:** In Progress

## Objective

Make TaskFlow better for repeated work and managing multiple tasks at once.

## Work Completed

- Added recurring task options:
  - Does not repeat
  - Daily
  - Weekly
  - Monthly
- Added recurrence information to task cards.
- Made recurring tasks move to their next occurrence when completed.
- Prevented the same recurring task from repeatedly advancing on the same day.
- Added task selection mode.
- Added selected-task count.
- Added bulk task completion.
- Added bulk edit and pin actions.
- Added bulk task deletion.
- Added multi-task Undo for bulk deletion.
- Updated delete feedback for single and multiple deleted tasks.
- Simplified task cards while selection mode is active.

## Work Remaining

- Add Select All / Select Visible.
- Add Clear Selection.
- Polish recurring-task edge cases where necessary.

## Concepts Learned

- Managing Multiple Selected Items
- Array-Based State Updates
- Date Calculations
- Recurring Task Logic
- Bulk State Updates
- Undoing Batch Operations
- Conditional Interfaces

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
