// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// for comment section
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import { useState } from 'react'

// ** Image Module Import MUI
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import itemData from '../../dummyData'
import CommentSection from 'src/views/commentSection'
import newFeedData from '../../dummyData/newFeedData'

const NewsFeedCard = ({ data }) => {
  const [collapse, setCollapse] = useState(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'info.main' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Mary Vaughn' src='/images/avatars/4.png' sx={{ width: 34, height: 34, marginRight: 2.75 }} />
            <Typography variant='body2' sx={{ color: 'common.white' }}>
              {data.userName}
            </Typography>
          </Box>
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white', textAlign: 'left' }}>
          {data.description}
        </Typography>
        <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
          {data.imageUrl.map(item => (
            <ImageListItem key={1}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                loading='lazy'
                alt={`${item.title}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
              <Heart sx={{ marginRight: 1.25 }} />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {data.likeNum}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShareVariant sx={{ marginRight: 1.25 }} />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {data.shareNum}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={handleClick} sx={{ color: 'common.white' }}>
                Comment
              </Button>
            </Box>
          </Box>
        </Box>
        <Collapse in={collapse} sx={{ textAlign: 'left' }}>
          <Divider sx={{ margin: 0 }} />
          {data.comment.length !== 0 ? (
            data.comment.map(cmt => (
              <CardContent key={cmt.id}>
                <CommentSection cmt={cmt}></CommentSection>
              </CardContent>
            ))
          ) : (
            <Box>
              <Typography
                variant='h6'
                sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
              >
                No comments available
              </Typography>
            </Box>
          )}
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default NewsFeedCard
