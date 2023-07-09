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
// import newFeedData from 'src/dummyData/newFeedData'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Box from '@mui/material/Box'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const NewsFeed = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const [loadingData, setLoadingData] = useState(true)
  const [newFeedData, setNewFeedData] = useState([])
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState({})
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

  const fetchNewsFeed = async () => {
    try {
      const res = await axios({
        url: `http://localhost:8000/api/posts`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('All cards', res.data)
      setNewFeedData(res.data)
      setLoadingData(false)
    } catch (error) {
      console.error(error)
      toast.error("Can't fetch post")
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
    fetchNewsFeed()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (token !== null) {
        try {
          const res = await axios({
            method: 'GET',
            // baseURL: API_URL,
            url: 'http://127.0.0.1:8000/api/company/loggedcompany',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log('Company Info: ', res)
          setCurrentUser(res.data.company)
        } catch (err) {
          console.log(err)
        }
      }
    }
    if (token !== null) {
      fetchUser()
    }
  }, [token])

  return (
    <ApexChartWrapper sx={{ alignContent: 'center', alignItems: 'center' }}>
      {loadingData && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
          <Typography variant='body1' style={{ marginLeft: '1rem' }}>
            Please wait, uploading image...
          </Typography>
        </div>
      )}
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
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
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
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <TabContext value={value}>
              <TabList centered aria-label='card navigation example' onChange={handleChange}>
                <Tab value='1' label='All' sx={{ fontWeight: '900' }} />
                <Tab value='2' label='Your Post' sx={{ fontWeight: '900' }} />
              </TabList>
              <TabPanel value='1' sx={{ p: 0 }}>
                {newFeedData &&
                  newFeedData
                    // .filter(data => data.promotion === 'false')
                    .map(data => (
                      <Grid spacing={5} m={5} key={data.newFeedId}>
                        <NewsFeedCard data={data} user_id={currentUser.company_id}></NewsFeedCard>
                      </Grid>
                    ))}
              </TabPanel>
              <TabPanel value='2' sx={{ p: 0 }}>
                <Grid item display='flex' flexDirection='row'>
                  {newFeedData.company_id !== null ? (
                    newFeedData.filter(data => data.company_id === currentUser.company_id).length > 0 ? (
                      newFeedData
                        .filter(data => data.company_id === currentUser.company_id)
                        .map(data => (
                          <Grid spacing={5} m={5} key={data.id}>
                            <NewsFeedCard data={data} user_id={currentUser.company_id}></NewsFeedCard>
                          </Grid>
                        ))
                    ) : (
                      <Grid
                        spacing={5}
                        m={5}
                        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                      >
                        <Typography marginTop={10} variant='h3'>
                          No posts yet lah
                        </Typography>
                      </Grid>
                    )
                  ) : (
                    <Typography marginTop={10} variant='h3'>
                      No posts yet
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default NewsFeed
