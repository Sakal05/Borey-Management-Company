import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import newFeedData from 'src/dummyData/newFeedData'
import Grid from '@mui/material/Grid'
import NewsFeedCard from '../../views/newsFeedCard'
import HomeOutline from 'mdi-material-ui/HomeOutline'

const AlignItemsList = () => {
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()
  console.log(router.query)

  const performSearch = () => {
    // Perform the necessary search operations and return the search results with fetch api
    const temp_data = [
      { name: 'sakal', age: 30, location: 'San Francisco, CA' },
      { name: 'sk', age: 30, location: 'Kbae Teas neak jit khang, LA' }
    ]

    const temp_service = [
      {
        serviceName: 'General Fixing',
        subService: [
          { subServiceName: 'Electronic Repair' },
          { subServiceName: 'Water Repair' },
          { subServiceName: 'House Hold Repair' }
        ]
      },
      {
        serviceName: 'Environmental Fixing',
        subService: [{ subServiceName: 'Energy Efficiency' }, { subServiceName: 'Water Management' }]
      }
    ]
    
    // ... perform search logic and return results
    setSearchResults(temp_service)
  }

  useEffect(() => {
    performSearch()
  }, [])
  console.log('Search query:', searchResults)

  return (
    <Box>
      <Box>
        {searchResults.length !== 0 && (
          <Typography variant='h5' marginLeft={5}>
            Services
          </Typography>
        )}
        {searchResults.map(item => (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Grid spacing={5} m={5} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <HomeOutline />
              {item.serviceName}
              <Grid spacing={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {item.subService.map(subItem => (
                  <Box m={2}>{subItem.subServiceName}</Box>
                ))}
              </Grid>
            </Grid>
            <Divider variant='inset' component='div'></Divider>
          </Box>
        ))}
      </Box>
      <Box>
        {newFeedData.length !== 0 && <Typography marginLeft={5}>Based on your search result</Typography>}
        {newFeedData.map(data => (
          <Grid spacing={5} m={5} key={data.newFeedId}>
            <NewsFeedCard data={data}></NewsFeedCard>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

export default AlignItemsList
