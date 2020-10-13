const express = require('express');
const router = express.Router()
const { auth } = require("../middleware/auth")
const CommentController = require('../controllers/CommentController')

router.post('/saveComment', auth, CommentController.saveComment)


module.exports = router