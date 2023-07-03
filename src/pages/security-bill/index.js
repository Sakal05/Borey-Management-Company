import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import SecurityBillForm from 'src/views/security-bill-form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 200
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 200
  }
}))

const SecurityBill = () => {
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
                <Typography sx={{ m: 2 }}>Security Bill Form</Typography>
              </Box>
            }
          />
        </TabList>

        <TabPanel value='account' sx={{ p: 0 }}>
          <SecurityBillForm />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default SecurityBill
