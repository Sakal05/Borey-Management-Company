// ** React Imports
import { useState } from 'react'

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

const RequestFormField = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [requestData, setRequestData] = useState({
    category: '',
    description: '',
    file: {}
  });

  const onFileChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
    setRequestData(prevData => ({
    ...prevData,
      file: files[0]
    }))
  }

  const onChange = e => {
    const { name, value } = e.target;
    setRequestData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log(requestData);
    const url = e.target.action;
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestData)
    // })

    console.log(requestData);
    console.log(JSON.stringify(requestData))
    
  }

  return (
    <CardContent>
      <form onSubmit={onSubmit} action='apiLinkHere' method='POST'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Request Category</InputLabel>
              <Select label='category' name='category' value={requestData.category} onChange={onChange}>
                <MenuItem value='house'>House Material Request</MenuItem>
                <MenuItem value='road'>Road Request</MenuItem>
                <MenuItem value='environment'>Environment Request</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Request'
              name='request'
              placeholder='Descripte your request here'
              onChange={onChange}
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
                    onChange={onFileChange}
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
              Submit Request
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default RequestFormField
