# TodoApp

A modern, full-stack todo application with a clean React frontend and Express.js backend.

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Styling:** Tailwind CSS with CSS variables for theming
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+ 
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

## Project Structure

```
├── backend/           # Express.js API
│   ├── core/         # Database connection & response helpers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── config/       # Configuration
│   ├── .env          # Environment variables
│   └── main.js       # Entry point
│
├── frontend/         # React SPA
│   ├── src/
│   │   ├── apis/     # API client
│   │   ├── components/
│   │   ├── hooks/    # React hooks
│   │   ├── types/    # TypeScript types
│   │   └── App.tsx   # Main app
│   ├── .env          # Environment variables
│   └── package.json
│
└── README.md
```

## Quick Start

### 1. Clone & Install

```bash
git clone <https://github.com/oscaroguledo/TodoApp.git>
cd TodoApp

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

#### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todoapp
```

**For MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The app will open at `http://localhost:5173` with API at `http://localhost:3000`.

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with auto-reload (Node.js --watch) |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

### Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

## Features

- ✨ Create, read, update, delete todos
- 🔍 Search todos
- 📊 Priority levels (P1-P5)
- 📅 Due dates
- 🌓 System dark mode support
- 📱 Responsive design
- 🔄 Drag & drop reordering
- ⚡ Optimistic UI updates

## Environment Variables Reference

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | Required |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## Troubleshooting

**MongoDB connection fails:**
- Verify MongoDB is running: `mongosh` or `mongo`
- Check `MONGO_URI` in `backend/.env`
- For Atlas: whitelist your IP in Network Access

**Port already in use:**
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` to match

**Module not found errors:**
- Run `npm install` in both `backend/` and `frontend/`
- Ensure Node.js 18+ is installed: `node --version`

## License

Apache-2.0
