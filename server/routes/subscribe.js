const express = require('express')
const router = express.Router()
const { auth } = require("../middleware/auth")
const SubscriberController = require('../controllers/SubscribeController')

router.post('/subscribeNumber', SubscriberController.subscribeNumber) 
router.post('/subscribed', SubscriberController.subscribed) 
router.post('/subscribe', SubscriberController.subscribe)
router.post('/unsubscribe', SubscriberController.unsubscribe)

module.exports = router;
