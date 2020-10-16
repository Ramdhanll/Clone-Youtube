import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography, Row, Col } from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes'
import { useSelector } from 'react-redux'

function DetailVideoPage(props) {
   const user = useSelector(state => state.user)
   const videoId = props.match.params.videoId
   const [Video, setVideo] = useState([])
   const [CommentLists, setCommentLists] = useState([])

   const videoVariable = {
      videoId
   }

   useEffect(() => {
      axios.post('/api/video/getVideo', videoVariable)
      .then((response) => {
         if(response.data.success) {
            // console.log('detail video', response.data)
            setVideo(response.data.video)
         } else {
            alert('Failed to get video info')
         }
      })
   }, [videoId])

   useEffect(() => {
      axios.post('/api/comment/getComments', videoVariable)
      .then((response) => {
         if(response.data.success) {
            // console.log('get comments', response.data)
            setCommentLists(response.data.comments)
         } else {
            alert('Failed to get video info')
         }
      })
   }, [videoId])

   const updateComment = (newComment) => {
      setCommentLists(CommentLists.concat(newComment))
   }

   return (
      <Row>
         <Col lg={18} xs={24}>
            <div className='postPage' style={{width:'100%', padding:'3rem 2em'}}>
               <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
               {
                  Video.writer && user.userData? (
                  <List.Item
                     actions={[ 
                                 <LikeDislikes video videoId={videoId} userId={user.userData._id} />,
                                 <Subscriber userTo={Video.writer._id} userFrom={user.userData._id}/>
                              ]}
                  >
                  <List.Item.Meta
                     avatar={<Avatar src={Video.writer && Video.writer.image} />}
                     description={Video.description}
                     title={<a href="https://ant.design">{Video.title}</a>}
                  />
                  <div></div>
               </List.Item>
                  ) : (<div>Loading...</div>)
               }

               <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment}/>
            </div>
         </Col>
         <Col lg={6} xs={24}>
            <SideVideo id={videoId}/>
         </Col>
      </Row>
   )
}

export default DetailVideoPage
