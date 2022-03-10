const express = require('express')
const router = express.Router()
const {
  addService,
  removeService,
  getServices,
} = require('../controllers/serviceController')
const { protect } = require('../middleware/authMiddleware')

router.post('/add', protect, addService)
router.delete('/:code', protect, removeService)
router.get('/', protect, getServices)

module.exports = router
