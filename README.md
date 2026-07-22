# MERN Quiz App

A full-stack quiz application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create custom multiple-choice quizzes, manage them from a central dashboard, and take quizzes with instant scoring and result feedback.

## Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI library |
| Tailwind CSS 4 | Utility-first CSS framework |
| React Router 7 | Client-side routing |
| Axios | HTTP client for API requests |
| Vite 8 | Frontend build tool and dev server |
| Node.js | Server-side JavaScript runtime |
| Express 5 | Backend web framework |
| Mongoose 9 | MongoDB object modeling for Node.js |
| MongoDB | NoSQL database |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A MongoDB instance (local or cloud-hosted, e.g. MongoDB Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ArhamKabir/Mern-quiz-app.git
cd Mern-quiz-app
```

2. Set up the backend:

```bash
cd backend
npm install
```

3. Create a `.env` file inside the `backend` directory with the following variables:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

4. Start the backend server:

```bash
npm run dev
```

5. In a new terminal, set up and start the frontend:

```bash
cd Mern-quiz-app
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## Features

- Create custom quizzes with a title, description, and multiple-choice questions
- Set the correct answer for each question during quiz creation
- Take quizzes through a clean, interactive interface
- Get instant scoring and result feedback upon quiz completion
- Delete quizzes from the dashboard
- Responsive design that works across devices

## Demo

https://github.com/user-attachments/assets/d23af4be-87fd-4883-8b10-9310e0542594
