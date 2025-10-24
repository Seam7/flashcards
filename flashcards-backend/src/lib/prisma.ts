// Prisma singleton with CommonJS-compatible typed require
// Avoid multiple instances in watch mode
const prismaModule = require('../generated/prisma') as typeof import('../generated/prisma')
const { PrismaClient } = prismaModule

const prisma = new PrismaClient()

async function disconnectPrisma() {
  await prisma.$disconnect()
}

module.exports = {
  prisma,
  disconnectPrisma,
}
