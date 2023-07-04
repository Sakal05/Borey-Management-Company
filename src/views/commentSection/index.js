import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

const CommentSection = ({ cmt }) => {
  if (cmt === null) {    
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
    if (cmt.companies !== null) {
      const companyInfo = cmt.companies
      return (
        <Box key={cmt.id}>
          <Typography
            variant='h6'
            sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar alt='Mary Vaughn' src={'/images/avatars/4.png'} sx={{ width: 34, height: 34, marginRight: 2.75 }} />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {companyInfo.company_name}
              </Typography>
            </Box>
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white', textAlign: 'left' }}>
            {cmt.content}
          </Typography>
        </Box>
      )
    } else if (cmt.userInfo !== null) {
      const userInfo = cmt.user_info;
      const user = userInfo.user
      return (
        <Box key={cmt.id}>
          <Typography
            variant='h6'
            sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar alt='Mary Vaughn' src={userInfo.image_cid ? `https://gateway.ipfs.io/ipfs/${userInfo.image_cid}` : '/images/avatars/4.png'} sx={{ width: 34, height: 34, marginRight: 2.75 }} />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
            {user.fullname}
              </Typography>
            </Box>
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white', textAlign: 'left' }}>
            {cmt.content}
          </Typography>
        </Box>
      )
    }
  }
  
}

export default CommentSection
