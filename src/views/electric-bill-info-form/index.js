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
// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Payment Deadline' fullWidth {...props} />
})

const ElectricBillInfoForm = () => {
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
    houseNum: '',
    email: '',
    status: ''
  })

  const [electricInfo, setElectricInfo] = useState({
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
    setElectricInfo(prevState => ({
      ...prevState,
      payment_deadline: formattedDate
    }))
  }

  const handleChangeInput = e => {
    setElectricInfo(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const getUserInfo = async e => {
    const id = e.target.value
    setElectricInfo(prevState => ({
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
    if (electricInfo.category === '' || electricInfo.price === '' || electricInfo.date === '') {
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

    console.log(electricInfo)
    let url;
    if (electricInfo.category === 'electric') {
      url = 'http://localhost:8000/api/electricbills'
    } else if (electricInfo.category === 'water') {
      url = 'http://localhost:8000/api/waterbills'
    }
    console.log(url)
    const SendData = electricInfo
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
        houseNum: '',
        email: '',
        status: ''
      })
      setElectricInfo({
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
          <Grid item xs={12} sm={12}>
            {/* <Typography variant='h5'> User Name</Typography>
            <Typography variant='body1'> {data.userName}</Typography> */}
            <TextField
              fullWidth
              label='User ID'
              name='user_id'
              onBlur={getUserInfo}
              onChange={handleChangeInput}
              value={electricInfo.user_id}
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
              value={userInfo.houseNum === null ? 'Null' : userInfo.houseNum}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Bill Category</InputLabel>
              <Select label='bill-category' name='category' value={electricInfo.category} onChange={handleChangeInput}>
                <MenuItem value='electric'>Electric Bill</MenuItem>
                <MenuItem value='water'>Water Bill</MenuItem>
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
              InputProps={{
                readOnly: false
              }}
              value={electricInfo.price}
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

export default ElectricBillInfoForm
