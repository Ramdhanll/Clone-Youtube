const { Comment } = require("../models/Comment")

const saveComment = (req, res) => {
   const comment = new Comment(req.body)
   comment.save((err, comment) => {
      if(err) return res.json({ success: false, err})

      Comment.find({ '_id' : comment._id})
      .populate('writer', '_id name image')
      .exec((err, result) => {
         if(err) return res.json({ success: false, err})

         return res.status(200).json({ success: true, result})
      })
   }) 
}

const getComments = (req, res) => {
   Comment.find({ "postId" : req.body.videoId })
   .populate('writer', '_id name image')
   .exec((err, comments) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, comments})
   })
}

module.exports = {
   saveComment,
   getComments
}