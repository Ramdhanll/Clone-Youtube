const { Subscriber } = require("../models/Subscriber")

const subscribeNumber = (req, res) => {
   Subscriber.find({"userTo" : req.body.userTo})
   .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({success : true, subscribeNumber: subscribe.length})
   })
}

const subscribed = (req, res) => {
   Subscriber.find({"userTo" : req.body.userTo, "userFrom" : req.body.userFrom})
   .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
      let result = false
      if(subscribe.length !== 0) {
         result = true
      }

      res.status(200).json({success : true, subscribed: result})
   })
}

module.exports = {
   subscribeNumber,
   subscribed
}