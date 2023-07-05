// ** MUI Imports
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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import tempQuestionForm from 'src/dummyData/formDummyData'
import { SettingsContext } from '../../../src/@core/context/settingsContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { useState, useContext, useRef, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const SurveyFormField = () => {
  const [surveyId, setSurveyId] = useState(null)
  const [submitLoading, setSubmitLoading] = useState('')
  const {
    contextTokenValue: { token }
  } = useContext(SettingsContext)
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: ''
  })
  // console.log('SurveyFormField', tempQuestionForm)

  /* 
       'title' => 'required',
        'description' => 'required',
  */

  const onChangeSurveyInput = e => {
    setSurveyData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const fetchSurveyForm = async e => {
    e.preventDefault()
    try {
      const res = await axios({
        url: 'http://localhost:8000/api/surveys',
        method: 'POST',
        data: surveyData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      setSurveyId(res.data.id)
      toast.success('Survey created successfully')
    } catch (err) {
      console.error(err)
    }
  }

  const [questions, setQuestions] = useState([])

  const handleCategoryChange = (event, questionIndex) => {
    const updatedQuestions = [...questions]
    if (event.target.value === 'text') {
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        category: event.target.value
      }
      //add answerOption to normal answer
      const updatedOptions = updatedQuestions[questionIndex].answerOptions
      updatedOptions[0] = {
        ...updatedOptions[0],
        answerText: 'Short Answer'
      }
      setQuestions(updatedQuestions)
    } else {
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        category: event.target.value
      }
    }
    setQuestions(updatedQuestions)
    console.log(questions)
  }

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: event.target.value
    }
    setQuestions(updatedQuestions)
    console.log(questions)
  }

  const handleAnswerOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions]
    const updatedOptions = updatedQuestions[questionIndex].answerOptions
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      answerText: event.target.value
    }
    setQuestions(updatedQuestions)
    console.log(questions)
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answerOptions: [], category: '' }])
  }

  const handleAddAnswerOption = questionIndex => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answerOptions.push({ answerText: '' })
    setQuestions(updatedQuestions)
  }

  const handleRemoveAnswerOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answerOptions.splice(optionIndex, 1)
    setQuestions(updatedQuestions)
  }

  const hanldeRemoveQuestion = questionIndex => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(questionIndex, 1)
    setQuestions(updatedQuestions)
  }

  useEffect(() => {
    setQuestions([{ question: '', answerOptions: [], category: '' }])
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    // Perform submission logic
    setSubmitLoading('true')

    // Check if any required fields are missing
    const isMissingFields = questions.some(question => {
      return (
        !question.question ||
        !question.category ||
        (question.category === 'mcq' && question.answerOptions.some(option => !option.answerText))
      )
    })

    if (isMissingFields) {
      // Display an error message or perform any necessary action
      console.log('Please fill in all the required fields.')
      setSubmitLoading('false')
      toast.error('Please fill in all the required fields')
      return
    }
    questions.map(async question => {
      //post questions
      /* 
        'survey_id' => 'required|exists:surveys,id,company_id,' . $user->company_id,
            'question' => 'required',
            'type' => 'required|in:text,mcq',
        */
      const questionField = {
        survey_id: surveyId,
        question: question.question,
        type: question.category
      }
      console.log(questionField)
      await axios({
        url: 'http://localhost:8000/api/questions',
        // url: '',
        method: 'POST',
        data: questionField,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        question.answerOptions.map(async answer => {
          const answerText = {
            answer: answer.answerText
          }
          console.log(answerText)
          await axios({
            url: `http://localhost:8000/api/questions/${res.data.id}/answers`,
            // url: '',
            method: 'POST',
            data: answerText,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(response => console.log(response))
        })
        setQuestions([{ question: '', answerOptions: [], category: '' }])
        setSurveyData({ title: '', description: '' })
        setSubmitLoading('false')
        toast.success('Form created successfully')
      })

      //get questions and and post each answer option
    })
  }

  return (
    <CardContent>
      {submitLoading === 'true' && (
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
      <form onSubmit={fetchSurveyForm}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Survey Title'
              name='title'
              onChange={onChangeSurveyInput}
              value={surveyData.title}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              label='Description'
              name='description'
              value={surveyData.description}
              onChange={onChangeSurveyInput}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} hidden={surveyId === null ? false : true}>
            <Button variant='contained' color='primary' fullWidth type='submit'>
              Initiate Survey
            </Button>
          </Grid>
        </Grid>
      </form>

      {surveyId !== null && (
        <form onSubmit={handleSubmit}>
          <Grid container mt={5}>
            {questions.map((question, questionIndex) => (
              <Grid container mt={3} spacing={4} xs={12} lg={12} md={12} key={questionIndex}>
                <Grid item xs={8} md={8} lg={8}>
                  <TextField
                    label={`Question ${questionIndex + 1}`}
                    fullWidth
                    value={question.question}
                    onChange={e => handleQuestionChange(questionIndex, e)}
                    sx={{ marginBottom: 5 }}
                  />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                  <FormControl fullWidth sx={{ marginBottom: 5 }}>
                    <InputLabel id={`category-label-${questionIndex}`}>Category</InputLabel>
                    <Select
                      // labelId={`category-label-${questionIndex}`}
                      label='Category'
                      id={`category-select-${questionIndex}`}
                      value={question.category}
                      onChange={e => handleCategoryChange(e, questionIndex)}
                    >
                      <MenuItem value='mcq'>Multiple Choice</MenuItem>
                      <MenuItem value='text'>Short Answer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                  <Button variant='outlined' color='secondary' onClick={() => hanldeRemoveQuestion(questionIndex)}>
                    Remove
                  </Button>
                </Grid>
                {question.category === 'mcq' && (
                  <Grid item>
                    {question.answerOptions.map((answerOption, optionIndex) => (
                      <Grid container spacing={4} xs={12} md={12} lg={12} key={optionIndex} mb={5}>
                        <Grid item xs={10} md={10} lg={10}>
                          <TextField
                            label={`Option ${optionIndex + 1}`}
                            fullWidth
                            value={answerOption.answerText}
                            onChange={e => handleAnswerOptionChange(questionIndex, optionIndex, e)}
                          />
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}>
                          <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => handleRemoveAnswerOption(questionIndex, optionIndex)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item mt={5}>
                      <Button variant='outlined' color='primary' onClick={() => handleAddAnswerOption(questionIndex)}>
                        Add Answer Option
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            ))}
            <Grid item xs={5} mb={5} mt={5}>
              <Button variant='outlined' color='primary' onClick={handleAddQuestion}>
                Add More Question
              </Button>
            </Grid>
            <Grid item xs={12} mb={12} lg={12}>
              <Button variant='contained' color='primary' fullWidth type='submit'>
                Create Survey
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </CardContent>
  )
}

export default SurveyFormField
