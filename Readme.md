# Simple Quiz App (MERN Stack)

A simple quiz application built using the **MERN stack** (MongoDB, Express, React, Node.js). The app allows users to take quizzes with questions stored in MongoDB. The UI adapts dynamically to different screen sizes using `window` functions for viewport width and height.

## Features
- Responsive UI adapting to various devices.
- Questions stored in MongoDB for dynamic quizzes.
- Real-time score tracking.
- Easy navigation between quiz screens.

## Tech Stack
- **Frontend:** React, React Router, Styled Components
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **State Management:** React Hooks

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/yourusername/simple-quiz-app.git
cd simple-quiz-app
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

## Project Structure
```
/simple-quiz-app
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── server.js
│   ├── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── LandingPage.js
|   |   |   |---Quiz.js
│   │   ├── hooks
│   │   │   ├── useViewportSize.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
├── README.md
```

## Usage
- Visit the landing page.
- Click on "Start Challenge" to begin the quiz.
- Answer the questions and view your score at the end.

## API Endpoints (Backend)
| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | /api/quiz      | Fetch all quiz questions |
| POST   | /api/quiz      | add new question       
 |



