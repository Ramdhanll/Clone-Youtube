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

const subscribe = (req, res) => {
   const subscribe = new Subscriber(req.body)

   subscribe.save((err, doc) => {
      if(err) return res.json({ success : false, err})
      return res.status(200).json({ success: true })
   })
}

const unsubscribe = (req, res) => {
   console.log(req.body)
   Subscriber.findOneAndDelete(req.body,
   (err, doc) => {
      if(err) return res.status(400).json({ success: false, err})
      return res.status(200).json({success : true, doc})
   })

}

module.exports = {
   subscribeNumber,
   subscribed,
   subscribe,
   unsubscribe
}