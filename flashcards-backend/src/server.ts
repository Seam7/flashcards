const { createApp } = require('./app')
const { disconnectPrisma } = require('./lib/prisma')

const PORT = Number(process.env.PORT || 3000)
const app = createApp()

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Users endpoint: http://localhost:${PORT}/`)
  console.log(`❤️  Health check: http://localhost:${PORT}/health`)
})

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...')
  server.close()
  await disconnectPrisma()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server (SIGTERM)...')
  server.close()
  await disconnectPrisma()
  process.exit(0)
})
