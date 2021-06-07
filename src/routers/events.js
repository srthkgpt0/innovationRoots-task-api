const express = require('express')
const auth = require('../middleware/auth')
const eventController = require('../controllers/event')
const router = express.Router()

router.post('/event', auth, eventController.addEvent)
router.get('/event', auth, eventController.getEvents)
router.post('/event/:id', auth, eventController.bookEvent)
router.get('/event/registeredUser', auth, eventController.getRegisteredUsers)
module.exports = router
