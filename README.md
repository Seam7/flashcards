# Flash Cards App

A full-stack flash cards application built with React, Express, and PostgreSQL. Create, manage, and study flash cards with an interactive quiz system.

## Features

- 🔐 **Secure Authentication**: JWT-based auth with HTTP-only cookies
- 👤 **User Accounts**: Create accounts with email/password authentication
- 📚 **Deck Management**: Create and organize flash card decks
- 🎯 **Interactive Quiz**: Study with a card-flipping quiz interface
- 📊 **Progress Tracking**: Visual indicators show your quiz progress
- 🎉 **Completion Celebration**: Confetti animation when you finish a quiz
- 🔄 **Retry Functionality**: Shuffle and retake quizzes
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Material-UI** for components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Prisma** ORM
- **PostgreSQL** database
- **JWT Authentication** with HTTP-only cookies
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flash_cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Install PostgreSQL on your system
   - Create a new database for the project
   - Note down your database connection details

4. **Configure environment variables**
   - Create a `.env` file in the `flashcards-backend` directory
   - Add your database connection string and JWT secret:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/flashcards_db"
     JWT_SECRET_KEY="your-super-secret-jwt-key-here"
     ```

5. **Set up the database**
   ```bash
   cd flashcards-backend
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Generate Prisma Client**
   ```bash
   cd flashcards-backend
   npx prisma generate
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This command will:
- Start the backend server (Express + Prisma)
- Start the frontend development server (Vite)
- Enable hot reloading for both services

### Individual Services

If you prefer to run services separately:

**Backend only:**
```bash
cd flashcards-backend
npm run dev
```

**Frontend only:**
```bash
cd flashcards-frontend
npm run dev
```

## Authentication

This app includes a complete JWT-based authentication system with HTTP-only cookies:

### Security Features
- **JWT Tokens**: Stateless authentication with 4-hour expiration
- **HTTP-Only Cookies**: Secure token storage (JavaScript cannot access)
- **Password Hashing**: bcrypt with 10 salt rounds
- **CORS Protection**: Configured for specific frontend origin
- **CSRF Protection**: SameSite cookie policy

### Authentication Flow
1. **Registration**: Users create accounts and are automatically logged in
2. **Login**: Email/password authentication with secure password verification
3. **Auto-Login**: Users stay logged in across browser sessions
4. **Logout**: Secure token invalidation

### Protected Routes
All deck and card operations require authentication. Public endpoints:
- `POST /create-account` - User registration
- `POST /login` - User authentication  
- `POST /logout` - User logout
- `GET /health` - Health check

## API Endpoints

### Public Endpoints
- `POST /create-account` - Create new user account
- `POST /login` - Authenticate user
- `POST /logout` - Logout user
- `GET /health` - Health check

### Protected Endpoints (Require Authentication)
- `GET /me` - Get current authenticated user
- `GET /decks` - Get user's flash card decks
- `GET /deck/:id` - Get a specific deck with its cards
- `POST /deck` - Create a new deck
- `PUT /deck/:id` - Update a deck
- `DELETE /deck/:id` - Delete a deck
- `POST /card` - Add a card to a deck
- `DELETE /card/:id` - Delete a card

## Database Schema

The application uses PostgreSQL with Prisma ORM. The main entities are:

- **User**: User accounts with email/password authentication
- **Deck**: Contains multiple flash cards (belongs to a user)
- **Card**: Individual flash card with question and answer (belongs to a deck)

## Development

### Adding New Features

1. **Frontend**: Add components in `flashcards-frontend/src/components/`
2. **Backend**: Add routes in `flashcards-backend/src/routes/`
3. **Database**: Update schema in `flashcards-backend/prisma/schema.prisma`

### Database Management

**Prisma Studio** - Visual database browser:
```bash
cd flashcards-backend
npx prisma studio
```
Opens at http://localhost:5555

**View Users in Database:**
```bash
cd flashcards-backend
npx prisma db execute --stdin <<< "SELECT id, name, email, age, \"createdAt\" FROM \"User\";"
```

### Database Migrations

When you modify the database schema:

```bash
cd flashcards-backend
npx prisma migrate dev
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check JWT_SECRET_KEY is set in .env
   - Verify cookies are being sent (check browser dev tools)
   - Ensure CORS is configured correctly

2. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check your `DATABASE_URL` in the `.env` file
   - Run `npx prisma migrate dev` to apply migrations
   - Verify database credentials

3. **Port Conflicts**
   - Backend runs on port 3000 by default
   - Frontend runs on port 5173 by default
   - Prisma Studio runs on port 5555
   - Make sure these ports are available

4. **CORS Issues**
   - The backend has CORS enabled for the frontend domain
   - Check that both services are running on expected ports

## Security Considerations

### Production Deployment
- Set `NODE_ENV=production` for secure cookies
- Use a strong, unique `JWT_SECRET_KEY`
- Ensure HTTPS in production
- Consider rate limiting for auth endpoints

### Password Requirements
- Users should use strong passwords
- Consider adding password validation rules
- Existing users have default password: `ChangeMe123!` (should be changed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
