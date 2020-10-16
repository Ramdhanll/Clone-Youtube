import React, { useState } from 'react'
import { Comment, Avatar, Button, Input} from 'antd'
import { useSelector } from 'react-redux'
import LikeDislikes from '../Sections/LikeDislikes'
import axios from 'axios'
const {TextArea} = Input

function SingleComment(props) {
   const user = useSelector(state => state.user)
   const [CommentValue, setCommentValue] = useState("")
   const [OpenReply, setOpenReply] = useState(false)

   
   const handleChange = e => {
      setCommentValue(e.currentTarget.value)
   }
   
   const openReply = e => {
      setOpenReply(!OpenReply)
   }
   
   const onSubmit = e => {
      e.preventDefault()

      const variables = {
         writer : user.userData._id,
         postId: props.postId,
         responseTo: props.comment._id,
         content: CommentValue

      }

      axios.post('/api/comment/saveComment', variables)
      .then((response) => {
         if(response.data.success) {
            setCommentValue("")
            setOpenReply(!OpenReply)
            props.refreshFunction(response.data.result)
         } else {
            alert('Failed to save comment')
         }
      })
   }
   
   const action = [
      <LikeDislikes comment commenId={props.comment._id} userId={localStorage.getItem('userId')} />,
      <span onClick={openReply} key="commen-basic-reply-to">Reply to</span>
   ]

   return (
      <div>
         <Comment
            actions={action}
            author={props.comment.writer.name}
            avatar={
               <Avatar
                  src={props.comment.writer.image}
                  alt="image"
               />
            }
            content={
               <p>
                  {props.comment.content}
               </p>
            }
         ></Comment>

         {OpenReply && 
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
               <TextArea
                  style={{ width: '100%', borderRadius: '5px'}}
                  onChange={handleChange}
                  value={CommentValue}
                  placeholder="write some comments"
               />
               <br/>
               <Button htmlType="submit" style={{ width: '20%', height: '52px'}} >Submit</Button>
            </form>
         }
         
      </div>
   )
}

export default SingleComment
