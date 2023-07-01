// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import { FormatListBulleted } from 'mdi-material-ui'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ElectricBillInfoForm = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
  // const router = useRouter()
  // const { userId, category } = router.query
  const [userInfo, setUserInfo] = useState({
    userName: '',
    name: '',
    houseNum: '',
    email: '',
    status: ''
  })

  const [electricInfo, setElectricInfo] = useState({})

  const handleChangeInput = e => {
    setElectricInfo(prevState => ({
      ...prevState,
      ...userInfo,
      [e.target.name]: [e.target.value]
    }))
  }

  const getUserInfo = async e => {
    const id = e.target.value
    try {
      const res = await axios({
        url: `http://localhost:8000/api/user_infos/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data)
      setUserInfo({
        userName: res.data.user.username,
        name: res.data.user.fullname,
        houseNum: res.data.house_number,
        email: res.data.user.email,
        status: 'Active'
      })
    } catch (err) {
      toast.error('User not found')
      console.error(err)
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    const url = ''
    const SendData = electricInfo
    try {
      const res = await axios(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SendData)
      })
      console.log(res)
      toast.success('Form added successfully')
      setUserInfo({
        userName: '',
        name: '',
        houseNum: '',
        email: '',
        status: ''
      })
    } catch (e) {
      console.error(e)
      toast.error('Failed to add')
    }
  }
  useEffect(() => {
    // temp add userInfo for testing purpose
    console.log(userInfo)
  }, [])

  return (
    <CardContent>
      <form onSubmit={onSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            {/* <Typography variant='h5'> User Name</Typography>
            <Typography variant='body1'> {data.userName}</Typography> */}
            <TextField
              fullWidth
              label='User ID'
              name='user_id'
              onBlur={getUserInfo}
              // value={data.userName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              InputProps={{
                readOnly: false
              }}
              name='Name'
              value={userInfo.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Email'
              InputProps={{
                readOnly: false
              }}
              name='email'
              value={userInfo.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Status'
              InputProps={{
                readOnly: false
              }}
              name='status'
              value={userInfo.status}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='House Number'
              InputProps={{
                readOnly: false
              }}
              name='houseNum'
              value={userInfo.houseNum === null ? "Null" : userInfo.houseNum}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Bill Category</InputLabel>
              <Select label='bill-category'>
                <MenuItem value='electric'>Electric Bill</MenuItem>
                <MenuItem value='water'>Water Bill</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Total Bill'
              InputProps={{
                readOnly: false
              }}
              name='totalBill'
              // value={data.totalBill}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Add Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default ElectricBillInfoForm
