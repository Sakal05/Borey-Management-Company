// ** React Imports
import { forwardRef, useState, useEffect, useContext } from 'react'

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
import DatePicker from 'react-datepicker'
// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Payment Deadline' fullWidth {...props} />
})

const SecurityBillForm = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
  const [date, setDate] = useState(null)

  // const router = useRouter()
  // const { userId, category } = router.query
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    userName: '',
    name: '',
    house_number: '',
    email: '',
    status: ''
  })

  const [securityInfo, setSecurityInfo] = useState({
    category: '',
    payment_deadline: '',
    price: '',
    payment_status: 'pending'

    /*  === require field
            'user_id'=> 'required',
            'category' => 'required',
            'price' => 'required',
            'payment_status' => 'required',
      */
  })

  const onChangeDate = e => {
    console.log(e)
    setDate(e)
    const formattedDate = moment(e).format('YYYY-MM-DD')
    setSecurityInfo(prevState => ({
      ...prevState,
      payment_deadline: formattedDate
    }))
  }

  const handleChangeInput = e => {
    setSecurityInfo(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const getUserInfo = async e => {
    const id = e.target.value
    setSecurityInfo(prevState => ({
      ...prevState,
      user_id: id
    }))
    try {
      const res = await axios({
        url: `http://localhost:8000/api/user_infos/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('sec data: ',res.data)
      setUserInfo({
        userName: res.data.user.username,
        name: res.data.user.fullname,
        house_number: res.data.house_number,
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
    if (securityInfo.category === '' || securityInfo.price === '' || securityInfo.date === '') {
      toast.error('Please fill out all required information')
      return
    }

    /*  === require field
            'user_id'=> 'required',
            'category' => 'required',
            'date_payment' => 'required',
            'price' => 'required',
            'payment_status' => 'required',
      */

    console.log(securityInfo)
    let url= 'http://localhost:8000/api/securitybills'
    
    console.log(url)
    const SendData = securityInfo
    try {
      const res = await axios({
        url: url,
        method: 'POST',
        data: SendData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success('Form added successfully')
      setUserInfo({
        userName: '',
        name: '',
        house_number: '',
        email: '',
        status: ''
      })
      setSecurityInfo({
        user_id: '',
        payment_deadline: '',
        category: '',
        price: ''
      })
      setDate(null)
    } catch (err) {
      // if (err.response.code === 'ERR_BAD_REQUEST') {
      //   toast.error("User doesn not have enough information, Contact User Now")
      // }
      console.error(err)
      toast.error('Failed to add, house number is not available. Contact User Now')
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='User ID'
              name='user_id'
              onBlur={getUserInfo}
              onChange={handleChangeInput}
              value={securityInfo.user_id}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Fullname'
              name='fullname'
              value={userInfo.name}
              InputProps={{
                readOnly: true
              }}
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='House Number'
              value={userInfo.house_number}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Security Type</InputLabel>
              <Select label='security-type' name='category' onChange={handleChangeInput}>
                <MenuItem value='standard'>Standard</MenuItem>
                <MenuItem value='premium'>Premium</MenuItem>
                <MenuItem value='high-class'>High Class</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={onChangeDate}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Total Bill'
              name='price'
              value={securityInfo.price}
              onChange={handleChangeInput}
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

export default SecurityBillForm
