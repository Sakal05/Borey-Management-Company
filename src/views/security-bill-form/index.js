// ** React Imports
import { useState, useEffect } from 'react'
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
import { useRouter } from 'next/router'

const SecurityBillForm = () => {
  const router = useRouter()
  console.log(router.query.userId)
  const userId = router.query.userId

  const [securityInfo, setSecurityInfo] = useState({})
  const [securityType, setSecurityType] = useState('')
  const [securityPrice, setSecurityPrice] = useState('0')

  const handleSecurityType = e => {
    setSecurityType(e.target.value)
    setSecurityInfo(prevData => ({
      ...prevData,
      securityType: securityType
    }))

    // fetchSecurityInfo();
    /* Temp data set, reality need to implement data fetching to get price */
    if (e.target.value === 'standard') {
      setSecurityPrice('12000');
    } else if (e.target.value === 'premium') {
      setSecurityPrice('15000');
    } else if (e.target.value === 'high-class') {
      setSecurityPrice('20000');
    } else {
      setSecurityPrice('0');
    }
  }

  const fetchSecurityInfo = () => {
    fetch(`/security--info?type=${securityType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
         .then(res => res.json())
         .then(data => {
            if (data.message === 'fail') {
              alert(data.message)
            } else if (data.message ==='success') {
              setSecurityPrice(data.price)
            }
          })
  }

  const getUserSecurityInfo = () => {
    fetch(`/security-bill-info?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'fail') {
          alert(data.message)
        } else if (data.message === 'success') {
          setSecurityInfo(data)
        }
      })
  }

  console.log(securityInfo)
  console.log(securityType)
  console.log(securityPrice)

  useEffect(() => {
    // getUserElectricInfo();
    setSecurityInfo({
      userName: 'Sakal Samnang',
      name: 'Sakal',
      houseNum: '12',
      totalBill: securityPrice,
      paymentDeadline: '12/12/2022'
    })
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              placeholder='Sakal123'
              value={securityInfo.userName}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              placeholder='Sakal'
              value={securityInfo.name}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='House Number'
              placeholder='B12'
              value={securityInfo.houseNum}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Security Type</InputLabel>
              <Select label='security-type' value={securityType} onChange={handleSecurityType}>
                <MenuItem value='standard'>Standard</MenuItem>
                <MenuItem value='premium'>Premium</MenuItem>
                <MenuItem value='high-class'>High Class</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Total Bill'
              value={securityPrice}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default SecurityBillForm
