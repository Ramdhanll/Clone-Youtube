const {Like} = require('../models/Like')
const {Dislike} = require('../models/Dislike')

const getLikes = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId}
   } else {
      variable= { commentId: req.body.commentId}
   }

   Like.find(variable)
   .exec((err, likes) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, likes})
   })
}

const getDislikes = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId}
   } else {
      variable= { commentId: req.body.commentId}
   }

   Dislike.find(variable)
   .exec((err, dislikes) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, dislikes})
   })
}

const upLike = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId}
   } else {
      variable= { commentId: req.body.commentId, userId: req.body.userId}
   }

   const like = new Like(variable)
   // save the like information data in MongoDB
   like.save((err, result) => {
      if(err) return res.json({ success: false, err})

      // in case dislike button is already click, we need to decrease the dislike by 1
      Dislike.findOneAndDelete(variable)
      .exec((err, result) => {
         if(err) return res.status(400).json({ success: false, err})

         return res.status(200).json({ success: true})
      })
   })
}

const unLike = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId}
   } else {
      variable= { commentId: req.body.commentId, userId: req.body.userId}
   }

   Like.findOneAndDelete(variable)
   .exec((err, result) => {
      if(err) return res.status(400).json({ success: false, err})

      return res.status(200).json({ success: true})
   })

}

const unDislike = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId}
   } else {
      variable= { commentId: req.body.commentId, userId: req.body.userId}
   }

   Dislike.findOneAndDelete(variable)
   .exec((err, result) => {
      if(err) return res.status(400).json({ success: false, err})

      return res.status(200).json({ success: true})
   })
}

const upDislike = (req, res) => {
   let variable = {}
   if(req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId}
   } else {
      variable= { commentId: req.body.commentId, userId: req.body.userId}
   }

   const dislike = new Dislike(variable)
   // save the like information data in MongoDB
   dislike.save((err, result) => {
      if(err) return res.json({ success: false, err})

      // in case like button is already click, we need to decrease the like by 1
      Like.findOneAndDelete(variable)
      .exec((err, result) => {
         if(err) return res.status(400).json({ success: false, err})

         return res.status(200).json({ success: true})
      })
   })

}

module.exports = {
   getLikes,
   getDislikes,
   upLike,
   unLike,
   unDislike,
   upDislike
}