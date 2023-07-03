// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { useState, useContext, useRef, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

// ** Image Module Import MUI
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { styled } from '@mui/material/styles'

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const createPost = () => {
  const JWT = process.env.JWT
  const [uploadingImage, setUploadingImage] = useState('')
  const [collapse, setCollapse] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])

  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const router = useRouter()

  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  console.log(uploadedImages)

  const handleSubmit = event => {
    event.preventDefault()
    // Add your logic to handle form submission
    // For example, you can send the image and description to an API endpoint
    console.log('Description:', description)
  }

  const pinFilesToIPFS = async files => {
    // console.log(src)
    const uploadedImageURLs = []
    try {
      for (const file of files) {
        const form = new FormData()

        form.append('file', file)

        const metadata = JSON.stringify({
          name: file.name
        })

        form.append('pinataMetadata', metadata)

        const options = JSON.stringify({
          cidVersion: 0
        })
        form.append('pinataOptions', options)

        setUploadingImage('true')
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            Authorization: `Bearer ${JWT}`
          }
        })
        console.log(res.data)
        const image_cid = res.data.IpfsHash
        const imageURL = `https://gateway.ipfs.io/ipfs/${image_cid}`
        console.log(image_cid)
        uploadedImageURLs.push(imageURL) //push to image array after upload
        setUploadedImages(uploadedImageURLs)
        //display success message
        toast.success('Upload image successfully')
        setUploadingImage('false')
      }
    } catch (err) {
      setUploadingImage('')
      console.error(err)
      toast.error('Not able to upload file')
    }
  }

  const fetchUploadedImages = async () => {
    try {
      const fetchedImageURLs = []
      for (const imageURL of uploadedImages) {
        const response = await fetch(imageURL)
        if (response.ok) {
          const blob = await response.blob()
          const imageURL = URL.createObjectURL(blob)
          fetchedImageURLs.push(imageURL)
        } else {
          console.error(`Failed to fetch image from IPFS: ${imageURL}`)
        }
      }

      setUploadedImages(fetchedImageURLs)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch images')
    }
  }

  const onChangeFile = async e => {
    const files = Array.from(e.target.files)
    console.log(files)

    await pinFilesToIPFS(files)
  }

  const handleChangeFile = async e => {
    const file = e.target.files[0]
    console.log(file)
    try {
      const res = await axios({
        method: 'delete',
        url: `https://api.pinata.cloud/pinning/unpin/${formData.image}`,
        headers: {
          Authorization: `Bearer ${process.env.JWT}`
        }
      })
      console.log(res)
      await pinFilesToIPFS(file)
      toast.success('Image change successfully')
    } catch (e) {
      toast.error('Please update your image before updating')
      console.error(e)
    }
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white' }}>
      {uploadingImage === 'true' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
          <Typography variant='body1' style={{ marginLeft: '1rem' }}>
            Please wait, uploading image...
          </Typography>
        </div>
      )}
      <Grid container spacing={2} sx={{ m: 'auto', justifyContent: 'center', m: 10, marginBottom: 15 }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', m: 5 }}>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload Photo Here
                    <input
                      hidden
                      type='file'
                      multiple
                      onChange={onChangeFile}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 2 }}>
                    Allowed PNG or JPEG. Max size of 2MB.
                  </Typography>
                </Box>
              </Box>
              <Box>
                {uploadedImages.length > 0 && (
                  <ImageList cols={3} rowHeight={160}>
                    {uploadedImages.map((imageURL, index) => (
                      <ImageListItem key={index}>
                        <img src={imageURL} alt={`Uploaded Image ${index}`} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
            </Grid>

            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              label='Description'
              value={description}
              onChange={handleDescriptionChange}
              sx={{ mt: 2 }}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>
              Create Post
            </Button>
          </form>
        </Grid>
      </Grid>
    </Card>
  )
}

export default createPost
