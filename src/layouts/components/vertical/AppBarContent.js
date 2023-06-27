// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import AlignItemsList from 'src/pages/search'
import { useState } from 'react'
import { useRouter } from 'next/router';


const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;
  const [searchQuery, setSearchQuery] = useState(''); // Store the search query
  const [showSearchResults, setShowSearchResults] = useState(false); // Control the visibility of search results
  const router = useRouter();

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleSearch = event => {
    if (event.key === 'Enter') {
      console.log('Event by search: ', event.key);
      setSearchQuery(event.target.value);
      // router.push(`/search?q=${event.target.value}`);
      router.push({
        pathname: '/search',
        query: { q: `${event.target.value}`, k: "u1" },
    })
      setShowSearchResults(true); // Show the search results
    }
    return 
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
            placeholder='search here...'
            onKeyDown={handleSearch}
          />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
    
  )
}

export default AppBarContent
