const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const subscriberSchema = mongoose.Schema({
   userTo : {
      type : ObjectId,
      ref : 'User'
   },
   userFrom : {
      type : ObjectId,
      ref : 'User'
   }
}, { timestamps: true})

const Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = {Subscriber}