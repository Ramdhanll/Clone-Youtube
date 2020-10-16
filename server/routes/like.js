const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const LikeController = require('../controllers/LikeController')

router.post('/getLikes', auth, LikeController.getLikes)
router.post('/getDislikes', auth, LikeController.getDislikes)
router.post('/upLike', auth, LikeController.upLike)
router.post('/unLike', auth, LikeController.unLike)
router.post('/upDislike', auth, LikeController.upDislike)
router.post('/unDislike', auth, LikeController.unDislike)


module.exports = router