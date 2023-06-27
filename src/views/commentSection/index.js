import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

const CommentSection = ({ cmt }) => {
  if (cmt.length === 0) {    
    return (
      <Box key={cmt.id}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          No comments available
        </Typography>
      </Box>
    )
  }
  else {
    return (
      <Box key={cmt.id}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Mary Vaughn' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
            <Typography variant='body2' sx={{ color: 'common.white' }}>
              {cmt.userName}
            </Typography>
          </Box>
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white', textAlign: 'left' }}>
          {cmt.text}
        </Typography>
      </Box>
    )
  }
  
}

export default CommentSection
