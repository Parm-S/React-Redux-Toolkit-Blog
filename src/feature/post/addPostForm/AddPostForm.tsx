import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { useAppDispatch, useAppSelector } from '../../../app/hook'

import Input from '../../../components/common/input'
import Select from '../../../components/common/select'

import { selectAllUsers } from '../../users/userSlice'
import { addNewPost, postAdded } from '../postSlice'

interface Fields {
  title: string
  content: string
  userId: string | number
}

const AddPostForm: React.FC = () => {
  const methods = useForm<Fields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [addRequestStatus, setAddRequestStatus] = React.useState('idle')

  const users = useAppSelector(selectAllUsers)

  const dispatch = useAppDispatch()

  const { title, content, userId } = methods.formState.dirtyFields

  const resetHandler = React.useCallback(() => {
    methods.reset({
      title: '',
      content: '',
    })
  }, [methods])

  const submitHandler = methods.handleSubmit((data: Fields) => {
    if (data && addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending')
        dispatch(
          addNewPost({ title: data.title, body: data.content, userId: data.userId })
        ).unwrap()
        resetHandler()
      } catch (err) {
        console.error('Failed to save post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  })

  return (
    <Container component={'section'}>
      <Typography component={'h2'} textAlign={'center'} variant="h4">
        Add a Posts Form
      </Typography>
      <FormProvider {...methods}>
        <Container
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Select name={'userId'} label={'Author'} defaultValue={''}>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <Input type="text" name="title" label="Title" minLength={5} maxLength={50} />
          <Input type="text" name="content" label="Content" minLength={5} maxLength={100} />
          <Box
            component="div"
            sx={{
              display: 'flex',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={title === undefined || userId === undefined || content === undefined}
            >
              Add Post
            </Button>
            <Button type="reset" onClick={resetHandler}>
              Reset
            </Button>
          </Box>
        </Container>
      </FormProvider>
    </Container>
  )
}

export default AddPostForm
