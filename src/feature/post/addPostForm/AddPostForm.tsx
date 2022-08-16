import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { useAppDispatch, useAppSelector } from '../../../app/hook'

import Input from '../../../common/input'
import Select from '../../../common/select'

import { selectAllUsers } from '../../users/userSlice'
import { postAdded } from '../postSlice'

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

  const users = useAppSelector(selectAllUsers)

  const dispatch = useAppDispatch()

  const resetHandler = React.useCallback(() => {
    methods.reset({
      title: '',
      content: '',
    })
  }, [methods])

  const submitHandler = methods.handleSubmit((data: Fields) => {
    if (data) {
      dispatch(postAdded(data.title, data.content, data.userId))
      resetHandler()
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
            <Button type="submit" variant="contained">
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
