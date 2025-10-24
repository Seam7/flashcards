const express = require('express')
const authenticateToken = require('../authenticateToken')
const { asyncHandler } = require('../utils/asyncHandler')
const { login, me, logout, createAccount } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/login', asyncHandler(login))
router.get('/me', authenticateToken, asyncHandler(me))
router.post('/logout', asyncHandler(logout))
router.post('/create-account', asyncHandler(createAccount))

module.exports = router
