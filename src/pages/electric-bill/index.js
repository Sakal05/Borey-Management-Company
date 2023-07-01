// ** MUI Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
// import Tab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

import ElectricBillInfoForm from 'src/views/electric-bill-info-form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Typography } from '@mui/material'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 200
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 200
  }
}))


const ElectricBill = () => {
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          onChange={handleChange}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <Typography sx={{ m: 2 }}>Electric/Water Bill Form</Typography>
              </Box>
            }
          />
        </TabList>

        <TabPanel value='account' sx={{ p: 0 }}>
          <ElectricBillInfoForm />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ElectricBill
