// ** React Imports
import { useState, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import axios from 'axios'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const EnvironmentalFormField = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [forMeStatus, setForMeStatus] = useState(true)
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    category: '',
    problem_description: '',
    image: null,
    general_status: 'pending'
  })

  const onChangeFile = e => {
    const file = e.target.files[0]
    setImgSrc(URL.createObjectURL(file))
    setFormData(prevState => ({
      ...prevState,
      image: file
    }))
  }

  const handleInput = e => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))

    if (forMeStatus) {
      console.log('isForMe')

      setFormData(prevState => ({
        ...prevState,
        fullname: 'Sakal Samnang',
        email: 'sakal05@gmail.com'
      }))
    }
  }

  const handleUserStatus = e => {
    setForMeStatus(e.target.value === 'for_me' ? true : false)
    console.log('forMeStatus', e.target.value)
    console.log('forMeStatus', forMeStatus)
  }

  const submitForm = async e => {
    // We don't want the page to refresh
    e.preventDefault()

    console.log(formData)

    // ===== POST the data to the URL of the form
    const res = await axios({
      url: 'http://localhost:8000/api/form_generals',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })

    try {
      console.log(res)

      setFormData({
        fullname: '',
        email: '',
        general_status: 'pending',
        category: '',
        problem_description: '',
        image: ''
      })
    } catch (err) {
      alert('Error', err.message)
    }
  }

  return (
    <CardContent>
      <form onSubmit={submitForm} method='POST' action=''>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>For</InputLabel>
              <Select label='for' defaultValue='for_me' onChange={handleUserStatus}>
                <MenuItem value='for_me'>For me</MenuItem>
                <MenuItem value='for_other'>For other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {!forMeStatus ? (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInput}
                  fullWidth
                  label='Username'
                  name='userName'
                  placeholder='johnDoe'
                  defaultValue='johnDoe'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInput}
                  fullWidth
                  label='Name'
                  name='fullName'
                  placeholder='John Doe'
                  defaultValue='John Doe'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  name='email'
                  placeholder='johnySinh@example.com'
                  onChange={handleInput}
                />
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label='category' name='category' onChange={handleInput}>
                <MenuItem value='Energy Efficiency'>Energy Efficiency</MenuItem>
                <MenuItem value='Waste Management'>Waste Management</MenuItem>
                <MenuItem value='house_hold'>House Hold Repair</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Problem'
              name='problem_description'
              placeholder='Descripte your problem here'
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Photo Here
                  <input
                    hidden
                    type='file'
                    onChange={onChangeFile}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Change
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default EnvironmentalFormField
