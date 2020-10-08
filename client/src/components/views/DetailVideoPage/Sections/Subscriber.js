import React, { useEffect, useState} from 'react'
import axios from 'axios'

function Subscriber(props) {

   const userTo = props.userTo
   const userFrom = props.userFrom
   const [SubscribeNumber, setSubscribeNumber] = useState(0)
   const [Subscribed, setSubscribed] = useState(false)


   const onSubscribe = () => {
      const subscribeVariables = {
         userTo,
         userFrom
      }

      if(Subscribed) {
         // when we are already subscribe
         axios.post('/api/subscribe/unsubscribe', subscribeVariables)
         .then((response) => {
            if(response.data.success) {
               setSubscribeNumber(SubscribeNumber - 1)
               setSubscribed(!Subscribed)
            } else {
               alert('Failed to unsubscribe')
            }
         })
      } else {
         // when we are no subscribe yet
         axios.post('/api/subscribe/subscribe', subscribeVariables)
         .then((response) => {
            if(response.data.success) {
               setSubscribeNumber(SubscribeNumber + 1)
               setSubscribed(!Subscribed)
            } else {
               alert('Failed to subscribe')
            }
         })
      }
   }

   useEffect(() => {
      console.log('rendering gan')
      const subscribeNumberVariables = { 
         userTo,
         userFrom
      }
      axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then((response) => {
         if(response.data.success) {
            setSubscribeNumber(response.data.subscribeNumber)
         } else {
            alert('Failed to get subscriber number')
         }
      })

      axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then((response) => {
         if(response.data.success) {
            setSubscribed(response.data.subscribed)
         } else {
            alert('Failed to subscribed!')
         }
      })
   }, [userTo])

   return (
      <div>
         <button 
            onClick={onSubscribe}
            style={{
               backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, 
               borderRadius: '4px', 
               color: 'white',
               padding: '10px 16px',
               fontWeight: '500',
               fontSize: '1rem',
               textTransform: 'uppercase'
               }}>
            {SubscribeNumber} {Subscribed ? 'Disubscribe' : 'Subscribe'} 
         </button>
      </div>
   )
}

export default Subscriber
