// Require
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const { Video } = require("../models/Video")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 file is allowed'), false)
    }
    cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")

const uploadfiles = (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({success : false, err})
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
}

const thumbnail = (req, res) => {  
  let thumbsFilePath = ""
  let fileDuration = ""  

  // to get duration
  ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
    fileDuration = metadata.format.duration;
  })

  ffmpeg(req.body.filePath)
  .on('filenames', function(filenames) {
    console.log('Will generate ' + filenames.join(', '))
    thumbsFilePath = `uploads/thumbnails/${filenames[0]}`
  })
  .on('end', function() {
    console.log('Screenshots taken');
    return res.json({success: true, thumbsFilePath : thumbsFilePath , fileDuration : fileDuration})
  })
  .on('error', function(err, stdout, stderr) {
    console.log('Cannot process video: ' + err.message);
    return res.status(400).json(err.message)
  })
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count: 3,
    folder: 'uploads/thumbnails',
    size: '320x240',
    // %b input basename (filename without extension)
    filename: 'thumbnail-%b.png'
  });
}

const uploadVideo = (req, res) => {
  // isi variable video dengan data dari client yang terdapat pada req.body
  const video = new Video(req.body)

  video.save((err, video) => {
    if(err) return res.status(400).json({ success: false, err})
    return res.status(200).json({ success: true })
  })
}

module.exports = {
  uploadfiles,
  thumbnail,
  uploadVideo
}