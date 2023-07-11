import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import ImageList from '@mui/material/ImageList'
import moment from 'moment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import NewsFeedCard from '../../views/newsFeedCard'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import { useState, useEffect, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import newFeedData from 'src/dummyData/newFeedData'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Collapse from '@mui/material/Collapse'

const AlignItemsList = () => {
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
  const [searchResults, setSearchResults] = useState()
  const [selectedRow, setSelectedRow] = useState(null) // Add selectedRow state
  const [loadingData, setLoadingData] = useState(true)
  const [collapse, setCollapse] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const router = useRouter()
  const searchKeyWord = router.query.q
  console.log(router.query)

  const performSearch = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/search/`,
        method: 'GET',
        data: {
          keyword: searchKeyWord
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Search result', res)
      setSearchResults(res.data)
      setLoadingData(false)
    } catch (error) {
      console.error(error)
      // toast.error("Can't fetch post")
    }
  }

  const handleViewDetail = row => {
    console.log('row', row)
    setSelectedRow(row)
    // const { row } = props
    setCollapse(true)
    console.log(row.path)
  }

  const handleCloseDetail = () => {
    setCollapse(!collapse)
  }

  const getImageItems = row => {
    const imageItems = []
    console.log(row.path)
    let images = row.path.split(',') // Display only 4 images initially

    images.map((item, index) => {
      imageItems.push(
        <Grid item xs={12} sm={12} md={12} key={index}>
          <Box
            sx={{ height: '100%', width: '100%' }}
            onClick={() => handleViewImage(`https://gateway.ipfs.io/ipfs/${item}`)}
          >
            <img
              src={`https://gateway.ipfs.io/ipfs/${item}`}
              loading='lazy'
              alt={`Image ${index + 1}`}
              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} // Set square aspect ratio for images
            />
          </Box>
        </Grid>
      )
    })

    return imageItems
  }

  const postResult = () => {
    const posts = []
    if (searchResults.posts.original.length === 0) {
      posts.push(<Grid spacing={5} m={5}></Grid>)
    } else {
      searchResults.posts.original.map(item => {
        posts.push(
          <Grid spacing={5} m={5} key={item.id}>
            <NewsFeedCard data={item} user_id={currentUser.user_id}></NewsFeedCard>
          </Grid>
        )
      })
    }
    return posts
  }

  const electricBillResult = () => {
    const electricBill = []

    if (searchResults.electricBills.original === 'No data found.') {
      electricBill.push(<Fragment>No data match</Fragment>)
    } else {
      searchResults.electricBills.original.map(item => {
        electricBill.push(
          <Fragment key={item.id}>
            <TableRow hover role='checkbox' tabIndex={-1}>
              <TableCell align='left'> {item.user_id}</TableCell>
              <TableCell align='left'> {item.fullname}</TableCell>
              <TableCell align='left'>{item.category === 'electric' ? 'Electric Bill' : 'Water Bill'}</TableCell>
              <TableCell align='left'> {moment(item.created_at).format('YYYY-MM-DD')}</TableCell>
              <TableCell align='left'>{item.payment_status === 'success' ? '✅' : 'Pending'}</TableCell>
            </TableRow>
          </Fragment>
        )
      })
    }
    return electricBill
  }

  const formGeneralResult = () => {
    const formGeneral = []
    if (searchResults.formGenerals.original === 'No data found.') {
      formGeneral.push(<Fragment></Fragment>)
    } else {
      searchResults.formGenerals.original.map(item => {
        formGeneral.push(
          <Fragment key={item.id}>
            <TableRow hover role='checkbox' tabIndex={-1} >
              <TableCell align='left' onClick={() => router.push('/general-fixing')}> {item.user_id}</TableCell>
              <TableCell align='left' onClick={() => router.push('/general-fixing')}> {item.fullname}</TableCell>
              <TableCell align='left' onClick={() => router.push('/general-fixing')}>General Form</TableCell>
              <TableCell align='left' onClick={() => router.push('/general-fixing')}>{item.category}</TableCell>
              <TableCell align='left' onClick={() => handleViewDetail(item)}>
                <Button size='small' variant='outlined' sx={{ marginBottom: 7 }}>
                  View Detail
                </Button>
              </TableCell>
              {/* <TableCell align='left'> {format(new Date(info.created_at), 'MMM dd, yyyy')}</TableCell> */}
              <TableCell align='left' onClick={() => router.push('/general-fixing')}> {moment(item.created_at).format('YYYY-MM-DD')}</TableCell>
              <TableCell align='left' onClick={() => router.push('/general-fixing')}>{item.general_status === 'done' ? '✅' : 'Pending'}</TableCell>
            </TableRow>
          </Fragment>
        )
      })
    }

    if (searchResults.formEnvironments.original === 'No data found.') {
      formGeneral.push(<Fragment></Fragment>)
    } else {
      searchResults.formEnvironments.original.map(item => {
        formGeneral.push(
          <Fragment key={item.id}>
            <TableRow hover role='checkbox' tabIndex={-1} >
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}> {item.user_id}</TableCell>
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}> {item.fullname}</TableCell>
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}>Environmental Form</TableCell>
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}>{item.category}</TableCell>
              <TableCell align='left' onClick={() => handleViewDetail(item)}>
                <Button size='small' variant='outlined' sx={{ marginBottom: 7 }}>
                  View Detail
                </Button>
              </TableCell>
              {/* <TableCell align='left'> {format(new Date(info.created_at), 'MMM dd, yyyy')}</TableCell> */}
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}> {moment(item.created_at).format('YYYY-MM-DD')}</TableCell>
              <TableCell align='left' onClick={() => router.push('/environment-fixing')}>{item.environment_status === 'done' ? '✅' : 'Pending'}</TableCell>
            </TableRow>
          </Fragment>
        )
      })
    }
    return formGeneral
  }

  useEffect(() => {
    performSearch()
  }, [searchKeyWord])

  useEffect(() => {
    const fetchUser = async () => {
      if (token !== null) {
        try {
          const res = await axios({
            method: 'GET',
            // baseURL: API_URL,
            url: 'http://127.0.0.1:8000/api/loggeduser',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log('User Info: ', res.data.user)
          setCurrentUser(res.data.user)
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
    <Grid container display='flex' flexDirection='column' spacing={5}>
      <Grid item>
        <Typography>Search Result</Typography>
      </Grid>
      <Grid item>
        {searchResults && formGeneralResult().length > 0 && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant='h5' marginLeft={7} marginTop={3}>
              General Service Forms
            </Typography>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label='sticky table' sx={{ margin: 5 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 50 }}>User ID</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Fullname</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Form Type</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Category</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Problem</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Created at</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{formGeneralResult()}</TableBody>
              </Table>
            </TableContainer>
            <Collapse in={collapse}>
              {selectedRow && (
                <Table stickyHeader aria-label='sticky table'>
                  <Box sx={{ m: 2 }}>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                      <Typography variant='h6' gutterBottom component='div' marginLeft={7}>
                        Form Detail Results
                      </Typography>
                      <Button size='small' variant='outlined' onClick={handleCloseDetail}>
                        <Typography
                          variant='body5'
                          gutterBottom
                          component='div'
                          style={{ marginLeft: 7, textAlign: 'center' }}
                        >
                          Close
                        </Typography>
                      </Button>
                    </Box>
                    <Table size='small' aria-label='purchases' sx={{ margin: 5 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Problem Description</TableCell>
                          <TableCell>Image</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableCell sx={{ minWidth: 300, verticalAlign: 'top' }}>
                          <Typography variant='body1' sx={{ textAlign: 'left' }}>
                            {selectedRow.problem_description}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 200 }}>
                          <ImageList container>{getImageItems(selectedRow)}</ImageList>
                        </TableCell>
                      </TableBody>
                    </Table>
                  </Box>
                  <Divider />
                  <Divider />
                </Table>
              )}
            </Collapse>
          </Paper>
        )}
      </Grid>
      <Grid item>
        {searchResults && electricBillResult().length > 0 && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant='h5' marginLeft={7} marginTop={3}>
              Electric/Water Bill Results
            </Typography>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label='sticky table' sx={{ margin: 5 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 50 }}>User ID</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Fullname</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Category</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Created at</TableCell>
                    <TableCell sx={{ minWidth: 50 }}>Paid Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{electricBillResult()}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Grid>
      <Grid item>{searchResults && postResult().length > 0 && postResult()}</Grid>
    </Grid>
  )
}

export default AlignItemsList
