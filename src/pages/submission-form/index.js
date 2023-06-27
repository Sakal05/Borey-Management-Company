import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'

const SubmissionForm = () => {
  return (
    <Card>
      <Grid rowSpacing={15}>
        <Grid display={'flex'} flexDirection={'column'} textAlign={'left'} m={10}>
          <Typography variant='h4'>Submission Form</Typography>
          <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
            <InputLabel>User ID</InputLabel>
            <Typography variant='h6'>Sakal123</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
            <InputLabel>Form Type</InputLabel>
            <Typography variant='h6'>General Fixing</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
            <InputLabel>Category</InputLabel>
            <Typography variant='h6'>Sakal123</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
            <InputLabel>Problem</InputLabel>
            <Typography variant='h6'>Your Problem should be stated here!</Typography>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 5 }}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} href='/'>
              Back to Home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default SubmissionForm
