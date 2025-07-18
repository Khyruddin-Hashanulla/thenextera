# NextEra Learning Platform

NextEra is a modern learning platform designed to provide an interactive and engaging educational experience.

## Project Structure

- **Client**: Frontend React application
- **Server**: Backend Node.js/Express API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nextera.git
   cd nextera
   ```

2. Install all dependencies:
   ```
   npm run install:all
   ```

## Configuration

1. Create a `.env` file in the Server directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   ```

## Development

Run both client and server in development mode:
```
npm run dev
```

Run only the server:
```
npm run dev:server
```

Run only the client:
```
npm run dev:client
```

## Building for Production

Build the client application:
```
npm run build
```

## Running in Production

Start the production server:
```
npm start
```

## Features

- User authentication and authorization
- Course management
- Interactive learning materials
- Progress tracking
- Responsive design

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## License

This project is licensed under the MIT License. 