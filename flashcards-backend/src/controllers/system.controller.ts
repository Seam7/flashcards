import type { Request, Response } from 'express'
const prismaExport = require('../lib/prisma') as { prisma: import('../generated/prisma').PrismaClient }
const { prisma } = prismaExport

async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, age: true, createdAt: true, updatedAt: true },
  })
  res.json(users)
}

function health(_req: Request, res: Response) {
  res.json({ status: 'OK', message: 'Server is running' })
}

module.exports = { listUsers, health }
