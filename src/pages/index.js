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
import TextField from '@mui/material/TextField'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import NewsFeedCard from '../views/newsFeedCard'
import newFeedData from 'src/dummyData/newFeedData'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Box from '@mui/material/Box'

const NewsFeed = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const router = useRouter()

  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickNewPost = () => {
    router.push('./new-post')
  }

  const verifyLogin = token => {
    if (token === null) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    const t = localStorage.getItem('ctoken')
    token = t
    console.log('token here cont', token)
    if (!verifyLogin(t)) {
      toast.error('Please Login')
      router.push('pages/c/login')
    }
  }, [])

  return (
    <ApexChartWrapper sx={{ alignContent: 'center', alignItems: 'center' }}>
      <Grid
        container
        spacing={6}
        sx={{ m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container spacing={2}>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            sx={{
              m: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: 600,
              padding: 10,
              borderRadius: 8,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff'
            }}
          >
            <Grid item xs={12} onClick={handleClickNewPost}>
              <TextField sx fullWidth multiline rows={1} variant='outlined' placeholder="What's on your mind?" />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' fullWidth onClick={handleClickNewPost}>
                Create Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} sm={12} marginTop={5}>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            sx={{
              m: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: 600,
              padding: 10,
              borderRadius: 8,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff'
            }}
          >
            <TabContext value={value}>
              <Card sx={{ boxShadow: '0' }}>
                <TabList centered aria-label='card navigation example' onChange={handleChange}>
                  <Tab value='1' label='For You' sx={{ fontWeight: '900' }} />
                  <Tab value='2' label='Promotion' sx={{ fontWeight: '900' }} />
                </TabList>
                <CardContent sx={{ textAlign: 'center', padding: 0 }}>
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
              </Card>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default NewsFeed
