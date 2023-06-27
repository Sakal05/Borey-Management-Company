// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useState, useEffect, useContext } from 'react'

// ** MUI Imports for tab panel
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import NewsFeedCard from './newsFeedCard'
import newFeedData from 'src/dummyData/newFeedData'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const NewsFeed = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const router = useRouter()

  // ** State
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const verifyLogin = (token) => {
    if (token === null) {
      return false
    } else {
      return true
    }
  }
  
  useEffect(() => {
      const t = localStorage.getItem('ctoken');
      token = t;
      console.log('token here cont',token)
      if (!verifyLogin(t)) {
        toast.error("Please Login");
        router.push('pages/c/login')
      };

    }, [])

  return (
    <ApexChartWrapper sx={{ alignContent: 'center', alignItems: 'center' }}>
      {/* <Grid container spacing={6} m={5} sx={{ display: 'flex', justifyContent:'center', alignItems: 'center'}}>
        <Typography variant='h3' sx={{ alignItems: 'center', fontWeight: 700}}>
          NewsFeed
        </Typography>
      </Grid> */}
      <Grid container spacing={6} sx={{ m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <TabContext value={value}>
            <TabList centered onChange={handleChange} aria-label='card navigation example'>
              <Tab value='1' label='For You' sx={{ fontWeight: '900' }} />
              <Tab value='2' label='Promotion' sx={{ fontWeight: '900' }} />
            </TabList>
            <CardContent sx={{ textAlign: 'center' }}>
              <TabPanel value='1' sx={{ p: 0 }}>
                {newFeedData
                  .filter(data => data.promotion === 'false')
                  .map(data => (
                    <Grid spacing={5} m={5} key={data.newFeedId}>
                      <NewsFeedCard data={data}></NewsFeedCard>
                    </Grid>
                  ))}
              </TabPanel>
              <TabPanel value='2' sx={{ p: 0 }}>
                {newFeedData
                  .filter(data => data.promotion === 'true')
                  .map(data => (
                    <Grid spacing={5} m={5} key={data.newFeedId}>
                      <NewsFeedCard data={data}></NewsFeedCard>
                    </Grid>
                  ))}
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </Grid>
    </ApexChartWrapper>
  )
}

export default NewsFeed
