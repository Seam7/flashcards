const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const systemRoutes = require('./routes/system.routes')
const authRoutes = require('./routes/auth.routes')
const deckRoutes = require('./routes/deck.routes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

function createApp() {
  const app = express()

  const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
  app.use(cors({ origin, credentials: true }))
  app.use(express.json())
  app.use(cookieParser())

  app.use(systemRoutes)
  app.use(authRoutes)
  app.use(deckRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

module.exports = { createApp }
