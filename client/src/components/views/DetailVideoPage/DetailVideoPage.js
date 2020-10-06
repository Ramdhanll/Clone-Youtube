import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography } from 'antd'
import axios from 'axios';

function DetailVideoPage(props) {

   const videoId = props.match.params.videoId
   const [Video, setVideo] = useState([])

   const videoVariable = {
      videoId
   }

   useEffect(() => {
      axios.post('/api/video/getVideo', videoVariable)
      .then((response) => {
         if(response.data.success) {
            console.log(response.data)
            setVideo(response.data.video)
         } else {
            alert('Failed to get video info')
         }
      }).catch((err) => {
         
      });
   }, [])


   return (
      <div className='postPage' style={{width:'100%', padding:'3rem 4em'}}>
         <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
         <List.Item
            actions={[]}
         >
            <List.Item.Meta
               avatar={<Avatar src={Video.writer && Video.writer.image} />}
               description={Video.description}
               title={<a href="https://ant.design">{Video.title}</a>}
            />
            <div></div>
         </List.Item>

      </div>
   )
}

export default DetailVideoPage
