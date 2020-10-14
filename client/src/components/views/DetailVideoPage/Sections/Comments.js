import React, { useState } from 'react'
import { Button, Input } from 'antd'
import axios from 'axios';
import { useSelector } from 'react-redux'
import SingleComment from '../Sections/SingleComment'
import ReplyComment from '../Sections/ReplyComment'
const { TextArea } = Input

function Comments(props) {
   const user = useSelector(state => state.user)
   const [Comment, setComment] = useState("")

   const handleChange = e => {
      setComment(e.currentTarget.value)
   }

   const onSubmit = e => {
      console.log('asd')
      e.preventDefault()

      const variables = {
         content : Comment,
         writer: user.userData._id,
         postId: props.postId
      }

      axios.post('/api/comment/saveComment', variables)
      .then((response) => {
         if(response.data.success) {
            setComment("")
            props.refreshFunction(response.data.result)
         } else {
            alert('Failed to save comment')
         }
      })
   }

   return (
      <div>
         <br/>
         <p> replies </p>
         <hr/>
         {
            (props.CommentLists && props.CommentLists.map(( comment, index ) => (
                  (!comment.responseTo &&
                     <>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
                     </>
                  )
               ))
            )
         }
         
         {/* {root comment list} */}
         <form style={{display: 'flex'}} onSubmit={onSubmit}>
            <TextArea
               style={{ width: '100%', borderRadius: '5px'}}
               onChange={handleChange}
               value={Comment}
               placeholder="write some comments"
            />
            <br/>
            <Button htmlType="submit" style={{ width: '20%', height: '52px'}} >Submit</Button>
         </form>
      </div>
   )
}

export default Comments