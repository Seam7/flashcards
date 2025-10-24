const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { stringify } = require('csv-stringify/sync');
const multer = require('multer');
const { parse: parseCsv } = require('csv-parse/sync');
// Use a typed require so PrismaClient and prisma are fully typed in CommonJS
const prismaModule = require('./generated/prisma') as typeof import('./generated/prisma')
const { PrismaClient } = prismaModule
const authenticateToken = require('./authenticateToken');

const app = express();
const prisma = new PrismaClient();
const upload = multer({storage: multer.memoryStorage()});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Root route - Get all users
app.get('/', async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      }
    });
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
  const decks = await prisma.deck.findMany({ where: { userId: req.user.userId }});
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

app.get("/deck/:id/export", authenticateToken, async (req: any, res: any) => {
  try {
    const { id } = req.params;
  
    const deck = await prisma.deck.findUnique({
      where: { id: Number(id) },
      include: { cards: true }
    })
  
    if (!deck) {
      return res.status(404).json({ error: "Deck not found" })
    }
  
    if (deck.userId !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }
  
    const dataToExport = deck.cards.map(card => ({
      question: card.question,
      answer: card.answer,
      createdAt: card.createdAt.toISOString()
    }))
  
    const csvData = stringify(dataToExport, {
      header: true,
      columns: ["question", "answer", "createdAt"]
    })
  
    res.setHeader('Content-Disposition', `attachment; filename="${deck.name}.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csvData);
  } catch (error) {
    console.error('Error exporting deck:', error);
    res.status(500).json({ error: 'Failed to export deck' });
  }
});


app.post("/deck/import", authenticateToken, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if(!req.file.mimetype.includes('csv')) {
      return res.status(400).json({ error: 'Uploaded file is not a CSV' });
    }

    const providedName = req.body?.name && String(req.body.name).trim();
    const derivedNameFromFile = req.file.originalname.replace(/\.[^/.]+$/, '');
    const name = providedName || derivedNameFromFile || `Imported_${new Date().toISOString().slice(0,10)}`;

  const csvData = req.file.buffer.toString('utf-8');
  const records = parseCsv(csvData, { columns: true, trim: true, skip_empty_lines: true });

    if (records.length === 0) {
      return res.status(400).json({ error: 'CSV file is empty or invalid' });
    }

    const firstRecord = records[0];
    if (!firstRecord.question || !firstRecord.answer) {
      return res.status(400).json({ 
        error: 'CSV must have "question" and "answer" columns' 
      });
    }

    const deck = await prisma.deck.create({
      data: {
        name,
        userId: req.user.userId,
        cards: {
          create: records.map((record: any) => ({
            question: record.question,
            answer: record.answer,
          })),
        },
      },
      include: { cards: true },
    });

    res.json({ 
      success: true, 
      deck,
      cardsImported: records.length 
    });
    
  } catch (error) {
    console.error('Error importing deck:', error);
    res.status(500).json({ error: 'Failed to import deck' });
  }
});

app.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
      sameSite: 'strict',
    });
    
    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
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
    
    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
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

app.post('/create-account', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with hashed password
    const user = await prisma.user.create({ 
      data: { name, email, password: hashedPassword } 
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
      sameSite: 'strict',
    });
    
    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
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