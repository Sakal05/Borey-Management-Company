// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { useState } from 'react'
import Router from 'next/router'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Select from '@mui/material/Select'

const ElectricBill = () => {
  const [userId, setUserId] = useState('')
  const [category, setCatetory] = useState('')

  const handleUserId = e => {
    setUserId(e.target.value)
  }

  const handleCatetory = e => {
    setCatetory(e.target.value)
  }

  const handleNext = () => {
    Router.push({
      pathname: '/electric-bill-info',
      query: {
        userId: userId,
        category: category
      }
    })
  }
  console.log(category)
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <HelpCircleOutline sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
          Electric/Water Bill
        </Typography>
        <Box sx={{ display: 'flex' }} fullWidth>
          <Grid item xs={12} sm={12} sx={{ margin: 5 }}>
            <TextField label='User ID' placeholder='Enter user ID' name='userId' onChange={handleUserId} />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ margin: 5 }}>
            <FormControl>
              <InputLabel id='category-label'>Category</InputLabel>
              <Select labelId='category-label' label='Category' name='category' onChange={handleCatetory}>
                <MenuItem value='electric'>Electric Payment</MenuItem>
                <MenuItem value='water'>Water Payment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Button
          variant='contained'
          sx={{ padding: theme => theme.spacing(1.75, 5.5), marginTop: 5 }}
          onClick={handleNext}
        >
          Next
        </Button>
      </CardContent>
    </Card>
  )
}

export default ElectricBill
