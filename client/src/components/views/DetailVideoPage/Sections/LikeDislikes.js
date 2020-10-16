import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import axios from 'axios'

function LikeDislikes(props) {
   const [Likes, setLikes] = useState(0)
   const [Dislikes, setDislikes] = useState(0)
   const [LikeAction, setLikeAction] = useState(null)
   const [DislikeAction, setDislikeAction] = useState(null)

   let variables = {}

   if (props.video) {
      variables = {
         videoId: props.videoId,
         userId: props.userId
      }
   } else {
      variables = {
         commendId: props.commentId,
         userId: props.userId
      }
   }

   useEffect(() => {
      axios.post('/api/like/getLikes', variables)
      .then((response) => {
         if(response.data.success) {
            // How many likes does this video or comment have
            setLikes(response.data.likes.length)
 
            // if i already click this like button or not
            response.data.likes.map(like => {
               if(like.userId === props.userId) {
                  setLikeAction('liked')
               }
            })
         } else {
            alert('Failed get likes')
         }
      })

      axios.post('/api/like/getDislikes', variables)
      .then((response) => {
         if(response.data.success) {
            // How many likes does this video or comment have
            setDislikes(response.data.dislikes.length)

            // if i already click this like button or not
            response.data.dislikes.map(dislike => {
               if(dislike.userId === props.userId) {
                  setDislikeAction('disliked')
               }
            })
         } else {
            alert('Failed get dislikes')
         }
      })
   }, [])

   const onLike = e => {
      if(LikeAction === null) {
         axios.post('/api/like/upLike', variables)
         .then((response) => {
            if(response.data.success) {
               setLikes(Likes + 1)
               setLikeAction('liked')

               // if dislike button already click
               if(DislikeAction !== null) {
                  setDislikeAction(null)
                  setDislikes(Dislikes - 1)
               }
               
            } else {
               alert('Failed to increse like')
            }
         })
      } else {
         axios.post('/api/like/unLike', variables)
         .then((response) => {
            if(response.data.success) {
               setLikes(Likes - 1)
               setLikeAction(null)
            } else {
               alert('Failed to decrease like')
            }
         })
      }
   }

   const onDislike = e => {
      if(DislikeAction !== null) {
         axios.post('/api/like/unDislike', variables)
         .then((response) => {
            if(response.data.success) {
               setDislikes(Dislikes - 1)
               setDislikeAction(null)
            } else {
               alert('Failed to decrese dislike')
            }
         })
      } else {
         axios.post('/api/like/upDislike', variables)
         .then((response) => {
            if(response.data.success) {
               setDislikes(Dislikes + 1)
               setDislikeAction('disliked')

               // if like button already click
               if(LikeAction !== null) {
                  setLikeAction(null)
                  setLikes(Likes - 1)
               }
               
            } else {
               alert('Failed to increase dislike')
            }
         })
      }
   }

   return (
      <>
         <span key="comment-basic-like">
            <Tooltip title="Like">
               <Icon type="like"
                     theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                     onClick={onLike} />
            </Tooltip>
         <span style={{ paddingLeft: '8px', cursor: 'auto'}}>{ Likes }</span>
         </span>&nbsp; &nbsp;
         <span key="comment-basic-dislike">
            <Tooltip title="dislike">
               <Icon type="dislike"
                     theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                     onClick={onDislike}
                     />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto'}}>{ Dislikes }</span>
         </span>
      </>
   )
}

export default LikeDislikes
