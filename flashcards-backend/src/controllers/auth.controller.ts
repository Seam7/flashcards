import type { Request, Response } from 'express'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// Typed require to avoid prisma being `any` under CommonJS
const prismaExport = require('../lib/prisma') as { prisma: import('../generated/prisma').PrismaClient }
const { prisma } = prismaExport

const TOKEN_TTL = 4 * 60 * 60 * 1000

async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '4h' })
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_TTL,
    sameSite: 'strict',
  })

  const { password: _pw, ...userWithoutPassword } = user
  res.json({ success: true, message: 'Login successful', user: userWithoutPassword })
}

async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: (req as any).user.userId } })
  if (!user) return res.status(404).json({ error: 'User not found' })
  const { password: _pw, ...userWithoutPassword } = user
  res.json(userWithoutPassword)
}

function logout(_req: Request, res: Response) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.json({ success: true, message: 'Logged out successfully' })
}

async function createAccount(req: Request, res: Response) {
  const { name, email, password } = req.body
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ error: 'User with this email already exists' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hashedPassword } })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '4h' })
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_TTL,
    sameSite: 'strict',
  })

  const { password: _pw, ...userWithoutPassword } = user
  res.json(userWithoutPassword)
}

module.exports = { login, me, logout, createAccount }
