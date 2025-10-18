const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('../src/generated/prisma');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - Get all users
app.get('/', async (req: any, res: any) => {
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

app.post('/deck', async (req: any, res: any) => {
  const { name, userId } = req.body;
  const deck = await prisma.deck.create({ data: { name, userId } });
  res.json(deck);
});

app.get('/decks', async (req: any, res: any) => {
  const decks = await prisma.deck.findMany();
  res.json(decks);
});

app.get('/deck/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const deck = await prisma.deck.findUnique({ where: { id: Number(id) }, include: { cards: true } });
  res.json(deck);
});

app.put('/deck/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.deck.update({ where: { id: Number(id) }, data: { name } });
  res.json({ message: 'Deck updated' });
});

app.delete('/deck/:id', async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.deck.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deck deleted' });
});

app.post('/card', async (req: any, res: any) => {
  const { question, answer, deckId } = req.body;
  const card = await prisma.flashcard.create({ data: { question, answer, deckId } });
  res.json(card);
});

app.delete('/card/:id', async (req: any, res: any) => {
  const { id } = req.params;
  await prisma.flashcard.delete({ where: { id: Number(id) } });
  res.json({ message: 'Card deleted' });
});

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