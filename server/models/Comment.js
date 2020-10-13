const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const commentSchema = mongoose.Schema({
   writer: {
      type: ObjectId,
      ref: 'User'
   },
   postId: {
      type: ObjectId,
      ref: 'Video'
   },
   responseTo: {
      type: ObjectId,
      ref: 'User'
   },
   content: {
      type: String
   }

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }