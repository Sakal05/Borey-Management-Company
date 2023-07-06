// ** React Imports
import { useState, useContext, useEffect, useRef, Fragment } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import moment from 'moment'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import ImageList from '@mui/material/ImageList'

const FormField = () => {
  // ** State
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null) // Add selectedRow state
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleViewDetail = async row => {
    console.log('row', row)
    setSelectedRow(row)
    // const { row } = props
    console.log(row.path)
 
  }

  const fetchGeneralForm = async () => {
    try {
      const res = await axios({
        url: 'http://localhost:8000/api/form_generals',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data)
      setLoading(false)
      setData(res.data)
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  const verifyLogin = token => {
    if (token === null) {
      return false
    } else {
      return true
    }
  }

  const getImageItems = (row) => {
    const imageItems = []
    console.log(row.path)
    let images = row.path.split(','); // Display only 4 images initially

    images.map((item, index) => {
      imageItems.push(
        <Grid item xs={12} sm={12} md={12} key={index}>
          <Box sx={{ height: '100%', width: '100%' }} onClick={() => handleViewImage(`https://gateway.ipfs.io/ipfs/${item}`)}>
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

  const onUpdateStatus = async (e, info) => {
    const newStatus = e.target.value
    const form = new FormData()
    console.log(info);
    form.append('general_status', newStatus)

    try {
      const res = await axios({
        url: `http://localhost:8000/api/form_generals/${info.id}`,
        method: 'POST',
        data: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success(`Update status to '${newStatus}' successfully`)
      fetchGeneralForm()
    } catch (e) {
      console.log(e)
      toast.error("Failed to Update")
    }

  }

  const handleViewImage = (url) => {
    // router.push(`https://gateway.ipfs.io/ipfs/${selectedRow.path}`)
   
    window.open(url, '_blank')
  }

  useEffect(() => {
    const t = localStorage.getItem('ctoken')
    token = t
    console.log('token here inside curent page', token)
    if (!verifyLogin(t)) {
      toast.error('Please Login')
      router.push('pages/c/login')
    }
    fetchGeneralForm()
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label='sticky table' sx={{ margin: 5 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 80 }}>User Id</TableCell>
                      <TableCell sx={{ minWidth: 150 }}>FullName</TableCell>
                      <TableCell sx={{ minWidth: 100 }}>Category</TableCell>
                      <TableCell sx={{ minWidth: 50 }}>Problem</TableCell>
                      <TableCell sx={{ minWidth: 50 }}>Created at</TableCell>
                      <TableCell sx={{ minWidth: 50 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && data.length > 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((info) => {
                      console.log(info)
                      return (
                        <Fragment key={info.id}>
                          <TableRow hover role='checkbox' tabIndex={-1} onClick={() => handleViewDetail(info)}>
                            <TableCell align='left'>{info.user_id}</TableCell>
                            <TableCell align='left'>{info.fullname}</TableCell>
                            <TableCell align='left'>{info.category}</TableCell>
                            <TableCell align='left'>
                              <Button size='small' variant='outlined' sx={{ marginBottom: 7 }}>
                                View Detail
                              </Button>
                            </TableCell>
                            {/* <TableCell align='left'> {format(new Date(info.created_at), 'MMM dd, yyyy')}</TableCell> */}
                            <TableCell align='left'> {moment(info.created_at).format('YYYY-MM-DD')}</TableCell>

                            <TableCell align='left'>
                              <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                  name='status'
                                  value={info.general_status}
                                  displayEmpty={true}
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  onChange={e => onUpdateStatus(e, info)}
                                >
                                  <MenuItem value='pending'>Pending</MenuItem>
                                  <MenuItem value='in_progress'>In Progress</MenuItem>
                                  <MenuItem value='done'>Done</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {selectedRow && (
                <Table stickyHeader aria-label='sticky table' sx={{ margin: 5 }}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant='h6' gutterBottom component='div'>
                      Form Detail
                    </Typography>
                    <Table size='small' aria-label='purchases'>
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
                        <ImageList container>
                            {/* {console.log(getImageItems().length)} */}
                            {getImageItems(selectedRow)}
                          </ImageList>
                        </TableCell>
                      </TableBody>
                    </Table>
                  </Box>
                </Table>
              )}
            </Paper>
          )}
        </Grid>
      </form>
    </CardContent>
  )
}

export default FormField
