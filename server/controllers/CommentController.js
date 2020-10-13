const { Comment } = require("../models/Comment")

const saveComment = (req, res) => {
   const comment = new Comment(req.body)
   comment.save((err, comment) => {
      if(err) return res.json({ success: false, err})

      Comment.find({ '_id' : comment._id})
      .populate('writer', '_id name')
      .exec((err, result) => {
         if(err) return res.json({ success: false, err})

         return res.status(200).json({ success: true, result})
      })
   }) 
}

module.exports = {
   saveComment
}