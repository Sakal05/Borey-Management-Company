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
import Collapse from '@mui/material/Collapse'
import moment from 'moment'
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
import SubmissionForm from '../../pages/submission-form'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

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
    const image_src = await fetchImagePath(row.path)
    console.log('img src:', image_src)
    if (image_src) {
      setSelectedRow(prevData => ({
        ...prevData,
        image: image_src
      })) // Set the selected row in state
    }
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

  const fetchImagePath = async cid => {
    try {
      const response = await fetch(`https://gateway.ipfs.io/ipfs/${cid}`)
      if (!response.ok) {
        throw new Error('Failed to fetch image from IPFS')
      }
      const blob = await response.blob()
      const imageURL = URL.createObjectURL(blob)

      return imageURL
    } catch (error) {
      toast.error('Image not found')
      console.error(error)
    }
  }

  const onUpdateStatus = async (e, info) => {
    const newStatus = e.target.value
    const form = new FormData()

    form.append('problem_description', info.problem_description)
    form.append('image', info.path)
    form.append('general_status', newStatus)
    form.append('category', info.category)
    form.append('user_id', info.user_id)
    form.append('username', info.username)
    form.append('email', info.email)
    form.append('fullname', info.fullname)
    form.append('id', info.id)

    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`)
    }

    try {
      const res = await axios({
        url: 'http://localhost:8000/api/form_generals',
        method: 'POST',
        data: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      toast.success('Update Successfully')
    } catch (e) {
      console.log(e)
      toast.error("Can't Update")
    }

    console.log('Updated data', form)
  }

  const handleViewImage = () => {
    // router.push(`https://gateway.ipfs.io/ipfs/${selectedRow.path}`)
    const url = `https://gateway.ipfs.io/ipfs/${selectedRow.path}`
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
          <Grid item xs={12}>
            <Typography variant='h5'>General Form Info</Typography>
          </Grid>
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
                        <TableCell sx={{ minWidth: 100, verticalAlign: 'top' }}>
                          <Typography variant='body1' sx={{ textAlign: 'left' }}>
                            {selectedRow.problem_description}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200 }}>
                          <Box
                            sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}
                            onClick={handleViewImage}
                          >
                            <img src={selectedRow.image} alt='Image' style={{ maxWidth: '50%', maxHeight: '50%' }} />
                          </Box>
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
