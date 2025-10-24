const express = require('express')
const { asyncHandler } = require('../utils/asyncHandler')
const { listUsers, health } = require('../controllers/system.controller')

const router = express.Router()

router.get('/', asyncHandler(listUsers))
router.get('/health', health)

module.exports = router
