const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const likeSchema = mongoose.Schema({
   userId: {
      type: ObjectId,
      ref: 'User'
   },
   commentId: {
      type: ObjectId,
      ref: 'Comment'
   },
   videoId: {
      type: ObjectId,
      ref: 'Video'
   }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema)

module.exports = { Like }