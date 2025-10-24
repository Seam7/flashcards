const express = require('express')
const authenticateToken = require('../authenticateToken')
const { asyncHandler } = require('../utils/asyncHandler')
const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
})
const {
  createDeck,
  listDecks,
  getDeck,
  updateDeck,
  deleteDeck,
  createCard,
  deleteCard,
  exportDeck,
  importDeck,
} = require('../controllers/deck.controller')

const router = express.Router()

router.post('/deck', authenticateToken, asyncHandler(createDeck))
router.get('/decks', authenticateToken, asyncHandler(listDecks))
router.get('/deck/:id', authenticateToken, asyncHandler(getDeck))
router.put('/deck/:id', authenticateToken, asyncHandler(updateDeck))
router.delete('/deck/:id', authenticateToken, asyncHandler(deleteDeck))

router.post('/card', authenticateToken, asyncHandler(createCard))
router.delete('/card/:id', authenticateToken, asyncHandler(deleteCard))

router.get('/deck/:id/export', authenticateToken, asyncHandler(exportDeck))
router.post('/deck/import', authenticateToken, upload.single('file'), asyncHandler(importDeck))

module.exports = router
