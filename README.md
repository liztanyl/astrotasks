# AstroTasks

AstroTasks is a full-stack productivity app, tailored for Rocket Academy's (RA) full-time bootcamp students.

It features a 'pomodoro timer' and task lists that are populated daily with coursework from the RA Scheduler code on GitHub.

## Deployed App and App Demo

### Deployed App

Coming soon

<!-- View the deployed app [here]().

You may use the below details if you don't want to create a new account:

| Email                | Password | Student? | Batch \* |
| -------------------- | -------- | :------: | :------: |
| student-a@rocket.com | a        |   Yes    |  FTBC7   |
| student-b@rocket.com | a        |   Yes    |  FTBC8   |
| luna@astrotasks.com  | a        |    No    |    -     |

_\* FTBC stands for **Full-time Bootcamp**_ -->

### App Demo

> [Watch the app demo on YouTube](https://youtu.be/GiCIMvsridM)
> (Note: Logout button was only added after this video was recorded)

## Features

### Task List

Consists of 6 types of lists:

1. **Pre-Class** _(only for RA students)_
2. **Post-Class** _(only for RA students)_
3. Personal
4. Work
5. Project
6. Others

For RA students, each day's coursework is fetched from the [Rocket Academy Scheduler code](https://github.com/rocketacademy/scheduler/tree/main/src/data) and added to their **Pre-Class** and **Post-Class** task lists. This enables them to see at a glance all the coursework they need to complete for that day.

New tasks are fetched and added to the task lists every day at 10am (when class is in session).

### Pomodoro Timer

The _pomodoro technique_ encourages taking breaks in order to reduce burnout and improve focus and productivity.

- Each work session is 25 minutes, followed by a 5 minute break.
- After the 4th work session, users take a longer break of 15 minutes.

The browser will send a notification when each session is over and prompt the user to start the next session (this is only if the user has granted permission to receive Notifications from the web app).

## Technologies Used

### Frontend

- React
- Material UI

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize

## Learning Outcomes

This was my first time using React to build the frontend of a full-stack web application. By the end of the project, I felt comfortable with states, `useEffect`, and prop drilling (we hadn't learnt about `useReducer` yet).

The biggest technical challenge faced was probably manipulating the data fetched from RA's Schedule JSON files. But because of this, I also got a lot of practice with array and object methods.

> For context, we were given 3.5 weeks to complete the project (start to end), with 1 week for ideation, 2 weeks to build features, and 0.5 weeks to polish the app after feature freeze.
