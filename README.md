# Task Management App Backend

This is the backend for a React task management app. The backend is built using Node.js, Express, and MongoDB.

## Features

- User authentication (signup, login, logout)
- Task management (create, read, update, delete tasks)
- Category management (create, read, delete categories)
- Error handling with custom API errors
- CORS support
- Environment variable configuration

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ehtesham1234/proveway_task-manager-app-backend.git
   cd proveway_task-manager-app-backend


nstall dependencies:
npm install

Create a .env file in the root directory and add the following environment variables:
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

Start the server:
npm start

The server will be running on http://localhost:5000.
API Endpoints
Authentication
POST /api/v1/signup - User signup
POST /api/v1/login - User login
POST /api/v1/logout - User logout
GET /api/v1/user - Verify user
Tasks
POST /api/v1/tasks - Create a task
GET /api/v1/tasks - Get all tasks
PUT /api/v1/tasks/:id - Update a task
DELETE /api/v1/tasks/:id - Delete a task
Categories
POST /api/v1/categories - Create a category
GET /api/v1/categories - Get all categories
DELETE /api/v1/categories/:id - Delete a category
Error Handling
Custom API errors are handled using the ApiError class. Errors are logged to the console and appropriate error responses are sent to the client.

Hosted on Render
The backend is hosted on Render: https://proveway-task-manager-app-backend.onrender.com

Note: It is a free instance, so it will spin down with inactivity, which can delay requests by 50 seconds or more.
