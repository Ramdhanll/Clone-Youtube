const express = require('express')
const router = express.Router()
const VideoController = require('../controllers/VideoController')
const { auth } = require("../middleware/auth");



router.get('/getVideos', auth, VideoController.getVideos)
router.post('/uploadfiles', auth, VideoController.uploadfiles )
router.post('/thumbnail', auth, VideoController.thumbnail)
router.post('/uploadVideo', auth, VideoController.uploadVideo)
router.post('/getVideo', VideoController.getVideo)
module.exports = router