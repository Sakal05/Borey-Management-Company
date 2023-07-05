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
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
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
  // const [collapse, setCollapse] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageCIDs, setImageCIDs] = useState([])
  const [contentType, setContentType] = useState('')
  // const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [heading, setHeading] = useState('')
  const router = useRouter()

  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const handleHeadingChange = event => {
    setHeading(event.target.value)
  }

  const handleTypeChange = event => {
    setContentType(event.target.value)
  }

  console.log(uploadedImages)

  const pinFilesToIPFS = async files => {
    // console.log(src)
    const uploadedImageURLs = []
    const uploadedImageCIDs = []
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
        //set image cid to get it store in backend
        const image_cid = res.data.IpfsHash
        console.log(image_cid)
        uploadedImageCIDs.push(image_cid)

        const imageURL = `https://gateway.ipfs.io/ipfs/${image_cid}`
        uploadedImageURLs.push(imageURL)
        setUploadedImages(uploadedImageURLs)
        
        //display success message
        setImageCIDs(uploadedImageCIDs)
        toast.success('Upload image successfully')
        setUploadingImage('false')
      }
    } catch (err) {
      setUploadingImage('')
      console.error(err)
      toast.error('Not able to upload file')
    }
  }

  const onChangeFile = async e => {
    const files = Array.from(e.target.files)
    console.log(files)

    await pinFilesToIPFS(files)
  }

  const handleRemoveImage = async index => {
    const updatedImages = [...uploadedImages]
    updatedImages.splice(index, 1)
    setUploadedImages(updatedImages)

    const updateImageCIDs = [...imageCIDs]
    updateImageCIDs.splice(index, 1)
    setImageCIDs(updateImageCIDs)

    try {
      const res = await axios({
        method: 'delete',
        url: `https://api.pinata.cloud/pinning/unpin/${updateImageCIDs[index]}`,
        headers: {
          Authorization: `Bearer ${process.env.JWT}`
        }
      })
      console.log(res)
      toast.success('Image removed successfully')
    } catch (e) {
      toast.error('Failed to remove image')
      console.error(e)
    }
  }

  const onCreatePost = async e => {
    e.preventDefault()

    const imageCidsString = imageCIDs.join(',')
    /*
            'content_type' => 'required',
            'heading' => 'required',
            'description' => 'required',
            'image' => 'required',
    */

    const form = new FormData()
    form.append('image', imageCidsString)
    form.append('heading', heading)
    form.append('description', description)
    form.append('content_type', contentType)

    try {
      const res = await axios({
        url: 'http://localhost:8000/api/posts',
        method: 'POST',
        data: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success('Post uploaded successfully')
      router.push('/');
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const handleBeforeUnload = event => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

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
          <form onSubmit={onCreatePost}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant='outlined'
                label='Title'
                value={heading}
                onChange={handleHeadingChange}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            </Grid>
            <Grid item xs={12} marginTop={4}>
              <FormControl fullWidth>
                <InputLabel>Bill Category</InputLabel>
                <Select label='Content Type' name='content-type' value={contentType} onChange={handleTypeChange}>
                  <MenuItem value='general'>General</MenuItem>
                  <MenuItem value='promotion'>Promotion</MenuItem>
                  <MenuItem value='event'>Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          style={{ position: 'absolute', top: 5, right: 5 }}
                        >
                          Click here
                        </IconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
            </Grid>
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
