import type { Request, Response } from 'express'
const prismaExport = require('../lib/prisma') as { prisma: import('../generated/prisma').PrismaClient }
const { prisma } = prismaExport
const { toCsv } = require('../utils/csv')
const { sanitizeFilename } = require('../utils/filename')
const { parse: parseCsv } = require('csv-parse/sync')

async function createDeck(req: Request, res: Response) {
  const { name, userId } = req.body
  const deck = await prisma.deck.create({ data: { name, userId } })
  res.json(deck)
}

async function listDecks(req: Request, res: Response) {
  const decks = await prisma.deck.findMany({ where: { userId: (req as any).user.userId } })
  res.json(decks)
}

async function getDeck(req: Request, res: Response) {
  const deck = await prisma.deck.findUnique({
    where: { id: Number(req.params.id) },
    include: { cards: true },
  })
  res.json(deck)
}

async function updateDeck(req: Request, res: Response) {
  const { name } = req.body
  await prisma.deck.update({ where: { id: Number(req.params.id) }, data: { name } })
  res.json({ message: 'Deck updated' })
}

async function deleteDeck(req: Request, res: Response) {
  await prisma.deck.delete({ where: { id: Number(req.params.id) } })
  res.json({ message: 'Deck deleted' })
}

async function createCard(req: Request, res: Response) {
  const { question, answer, deckId } = req.body
  const card = await prisma.flashcard.create({ data: { question, answer, deckId } })
  res.json(card)
}

async function deleteCard(req: Request, res: Response) {
  await prisma.flashcard.delete({ where: { id: Number(req.params.id) } })
  res.json({ message: 'Card deleted' })
}

async function exportDeck(req: Request, res: Response) {
  const id = Number(req.params.id)
  const deck = await prisma.deck.findUnique({ where: { id }, include: { cards: true } })
  if (!deck) return res.status(404).json({ error: 'Deck not found' })
  if (deck.userId !== (req as any).user.userId) return res.status(403).json({ error: 'Unauthorized' })

  const rows = deck.cards.map((c: any) => ({
    question: c.question,
    answer: c.answer,
    createdAt: c.createdAt.toISOString(),
  }))

  const csv = toCsv(rows, ['question', 'answer', 'createdAt'])
  const filename = `${sanitizeFilename(deck.name)}_flashcards.csv`

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.send(csv)
}

async function importDeck(req: Request, res: Response) {
  if (!(req as any).file) return res.status(400).json({ error: 'No file uploaded' })

  const providedName = (req.body?.name && String(req.body.name).trim()) || ''
  const derivedNameFromFile = ((req as any).file.originalname as string).replace(/\.[^/.]+$/, '')
  const name = providedName || derivedNameFromFile || `Imported_${new Date().toISOString().slice(0, 10)}`

  const csvData = (req as any).file.buffer.toString('utf-8')
  const records = parseCsv(csvData, { columns: true, trim: true, skip_empty_lines: true })

  if (!Array.isArray(records) || records.length === 0)
    return res.status(400).json({ error: 'CSV file is empty or invalid' })

  const first = records[0]
  if (!first.question || !first.answer) {
    return res.status(400).json({ error: 'CSV must have "question" and "answer" columns' })
  }

  const deck = await prisma.deck.create({
    data: {
      name,
      userId: (req as any).user.userId,
      cards: { create: records.map((r: any) => ({ question: r.question, answer: r.answer })) },
    },
    include: { cards: true },
  })

  res.json({ success: true, deck, cardsImported: records.length })
}

module.exports = {
  createDeck,
  listDecks,
  getDeck,
  updateDeck,
  deleteDeck,
  createCard,
  deleteCard,
  exportDeck,
  importDeck,
}
