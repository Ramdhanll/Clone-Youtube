import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import moment from 'moment'

function SideVideo(props) {
   console.log('liat', props.id)
   const [SideVideos, setSideVideos] = useState([])

   useEffect(() => {
      axios.get('/api/video/getVideos')
      .then((response) => {
         if(response.data.success){
            console.log(response.data)
            setSideVideos(response.data.videos)
         } else {

         }
      })
   }, [])

   const renderVideos = SideVideos.filter(video => video._id != props.id).map(video => {

      let minutes = Math.floor(video.duration / 60)
      let seconds = Math.floor(video.duration - minutes * 60)

      return (
         <div style={{display: 'flex', margin: '1rem', padding: '0 1rem'}}>
            <div style={{width: '50%', marginRight: '1rem'}}>
               <a href={`/video/${video._id}`} style={{color: 'grey'}}>
                  <img src={`http://localhost:5000/${video.thumbnail}`} style={{width: '100%'}} />
               </a>
            </div>
            <div style={{ width: '50%'}}>
               <a href={`/video/${video._id}`} style={{color: 'grey'}}>
                  <span style={{fontSize: '1rem', color:'black', fontWeight:'500'}}>{video.title}</span> <br/>
                  <span>{video.writer.name}</span> <br/>
                  <span>{video.views} views</span> <br/>
                  <span> {minutes} : {seconds}  </span> <br/>
               </a>
            </div>
         </div>
      )
   })

   return (
      <>
         <div style={{marginTop: '3rem'}}>
            {renderVideos}
         </div>
      </>
   )
}

export default SideVideo
