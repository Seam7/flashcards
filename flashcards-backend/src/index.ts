const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('../src/generated/prisma');
const authenticateToken = require('./authenticateToken');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Root route - Get all users
app.get('/', authenticateToken, async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

app.post('/deck', authenticateToken, async (req: any, res: any) => {
  const { name, userId } = req.body;
  const deck = await prisma.deck.create({ data: { name, userId } });
  res.json(deck);
});

app.get('/decks', authenticateToken, async (req: any, res: any) => {
  const decks = await prisma.deck.findMany();
  res.json(decks);
});

app.get('/deck/:id', authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;
  const deck = await prisma.deck.findUnique({ where: { id: Number(id) }, include: { cards: true } });
  res.json(deck);
});

app.put('/deck/:id', authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.deck.update({ where: { id: Number(id) }, data: { name } });
  res.json({ message: 'Deck updated' });
});

app.delete('/deck/:id', authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.deck.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deck deleted' });
});

app.post('/card', authenticateToken, async (req: any, res: any) => {
  const { question, answer, deckId } = req.body;
  const card = await prisma.flashcard.create({ data: { question, answer, deckId } });
  res.json(card);
});

app.delete('/card/:id', authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.flashcard.delete({ where: { id: Number(id) } });
  res.json({ message: 'Card deleted' });
});

app.post('/login', async (req: any, res: any) => {
  const {email, password} = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
  // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 4 * 60 * 60 * 1000, // 4 hours
    sameSite: 'strict',
  });
  res.json({ success: true, message: 'Login successful', user });
})

// Get current authenticated user
app.get('/me', authenticateToken, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.user.userId } 
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
})

// Logout
app.post('/logout', (req: any, res: any) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ success: true, message: 'Logged out successfully' });
})

// Health check route
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Users endpoint: http://localhost:${PORT}/`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Fracchiolla