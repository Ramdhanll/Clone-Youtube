import React, { useEffect, useState } from 'react'
import SingleComment from '../Sections/SingleComment'

function ReplyComment(props) {
   const [ChildCommentNumber, setChildCommentNumber] = useState(0)
   const [OpenReplyComments, setOpenReplyComments] = useState(false)

   useEffect(() => {   
      let commentNumber = 0
      props.CommentLists.map((comment, index) => {
         if(comment.responseTo === props.parentCommentId) {
            commentNumber++
         }
      })
      setChildCommentNumber(commentNumber)
   }, [])

   let renderReplyComment = (parentCommentId) => (
         (props.CommentLists && props.CommentLists.map(( comment, index ) => (
            <>
            {comment.responseTo === parentCommentId &&
               <div style={{marginLeft: '40px', width: '80%'}}>
                  <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                  <ReplyComment CommentLists={props.CommentLists} postId={props.portId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
               </div>
            }
            </>
         ))
      )
   )

   let handleChange = e => {
      setOpenReplyComments(!OpenReplyComments)
   }
   

   return (
      <div>
         {ChildCommentNumber > 0 && 
         <p style={{ fontSize: '14px', margin: '0', color: 'gray', cursor: 'pointer'}} 
         onClick={handleChange}>
            view {ChildCommentNumber} more comment(s)
         </p>
         }

         { OpenReplyComments && 
            renderReplyComment(props.parentCommentId)
         }


      </div>
   )
}

export default ReplyComment
