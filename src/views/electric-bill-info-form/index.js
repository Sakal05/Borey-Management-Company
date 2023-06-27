// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const ElectricBillInfoForm = () => {
  const router = useRouter()
  const { userId, category } = router.query;

  const category_name =
    category === 'electric'
    ? 'Electric Bill Payment'
    : category === 'water'
    ? 'Water Bill Payment'
    : 'Unknown Category';
  
    const [electricInfo, setElectricInfo] = useState({});

  const getUserElectricInfo = () => {
    fetch(`/electric-bill-info?userId=${userId}&category=${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'fail') {
          alert(data.message);
        } else if (data.message === 'success') {
          setElectricInfo(data);
        }
      })
  }

  useEffect(() => {
    // getUserElectricInfo();
    setElectricInfo({
      userName: 'Sakal Samnang',
      name: 'Sakal',
      houseNum: '12',
      totalBill: '12000',
      paymentDeadline: '12/12/2022'
    })
  }, [])

  console.log('ele info: ', electricInfo)

  const data = electricInfo;
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onSubmit = e => {
    e.preventDefault()
    const url = e.target.action
    const SendData = data
    console.log(SendData)
    console.log(JSON.stringify(SendData))
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(SendData)
    })
  }

  return (
    <CardContent>
      <form onSubmit={onSubmit} action='' method='POST'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            {/* <Typography variant='h5'> User Name</Typography>
            <Typography variant='body1'> {data.userName}</Typography> */}
            <TextField
              fullWidth
              label='Username'
              InputProps={{
                readOnly: true
              }}
              name='userName'
              value={data.userName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='name'
              InputProps={{
                readOnly: true
              }}
              name='Name'
              value={data.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='House Number'
              InputProps={{
                readOnly: true
              }}
              name='houseNumber'
              value={data.houseNum}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Category'
              InputProps={{
                readOnly: true
              }}
              name='Category'
              value={category_name}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Total Bill'
              InputProps={{
                readOnly: true
              }}
              name='totalBill'
              value={data.totalBill}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default ElectricBillInfoForm
