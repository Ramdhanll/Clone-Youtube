import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from 'react-redux'

const { Title } = Typography
const { TextArea } = Input

const Private = [
  { value: 0, label: 'Private'},
  { value: 1, label: 'Public'}
]

const Category = [ 
  { value: 0, label: 'Film & Animation'},
  { value: 0, label: 'Autos & Vehicles'},
  { value: 0, label: 'Music'},
  { value: 0, label: 'Pets & Animals'},
  { value: 0, label: 'Sports'},
]

function UploadVideoPage(props) {
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Privacy, setPrivacy] = useState(0)
  const [Categories, setCategories] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [Thumbnail, setThumbnail] = useState("")

  const handleChangeTitle = event => {
    setTitle(event.currentTarget.value)
  }

  const handleChangeDecsription = event => {
    setDescription(event.currentTarget.value)
  }

  const handleChangeOne = event => {
    setPrivacy(event.currentTarget.value)
  }

  const handleChangeTwo = event => {
    setCategories(event.currentTarget.value)
  }

  const onSubmit = event => {
    event.preventDefault()

    const variables = {
      writer: user.userData._id,
      title: title,
      description: Description,
      privacy: Privacy,
      filePath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail
    }
    console.log(variables)

    axios.post('/api/video/uploadVideo', variables)
    .then((response) => {
      if(response.data.success) {
        alert('Video Uploaded Successfully')
        props.history.push('/')
      } else {
        alert('Failed to upload video')
      }
    }).catch((err) => {
      
    });
  }

  const onDrop = files => {
    let formData = new FormData()
    const config = {
      header : { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    axios.post('/api/video/uploadfiles', formData, config)
    .then( response => {
      console.log(response)
      if(response.data.success) {
        let variable = {
          filePath : response.data.filePath,
          fileName : response.data.fileName,
        }
        setFilePath(response.data.filePath)
        
        // genereate thumbnail with this filepath
        axios.post('/api/video/thumbnail', variable)
        .then((result) => {
          if(result.data.success){
            setDuration(result.data.fileDuration)
            setThumbnail(result.data.thumbsFilePath)
          }else {
            alert('Failed to make the thumbnails')
          }
        }).catch((err) => {
          
        });
      } else {
        alert('failed to save the video in server')
      }
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem '}}>
        <Title level={2} >Upload Video</Title>
      </div>
      
      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}} >
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}>
            {
              ({getRootProps, getInputProps}) => (
                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Icon type="plus" style={{ fontSize: '3rem' }} />
                </div>
              )
            }
          </Dropzone>

            {
              Thumbnail !== "" && 
                <div>
                  <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                </div>
            }
        </div>
        <br /><br />
        <label>Title</label>
        <Input
            onChange={handleChangeTitle}
            value={title}
        />
        <br /><br />
        <label>Description</label>
        <TextArea
            onChange={handleChangeDecsription}
            value={Description}
        />
        <br /><br />

        <select onChange={handleChangeOne} style={{padding: '3px 5px', borderColor: '#d8d8d8', borderRadius: '5px'}}>
            {Private.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))}
        </select>
        <br /><br />

        <select onChange={handleChangeTwo} style={{padding: '3px 5px', borderColor: '#d8d8d8', borderRadius: '5px'}}>
          {Category.map((item, index) => (
              <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>

      </Form>
    </div>
  )
}

export default UploadVideoPage
