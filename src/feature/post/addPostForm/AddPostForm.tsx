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
import { addNewPost, deletePost, IPost, postAdded, selectPostById, updatePost } from '../postSlice'
import { useNavigate, useParams } from 'react-router-dom'

interface Fields {
  title: string
  content: string
  userId: string | number
}

const AddPostForm: React.FC = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const methods = useForm<Fields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [addRequestStatus, setAddRequestStatus] = React.useState('idle')

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))

  React.useEffect(() => {
    if (post) {
      methods.setValue('title', post?.title)
      methods.setValue('content', post.body)
      methods.setValue('userId', post.userId!)
    }
    return () => {
      methods.setValue('title', '')
      methods.setValue('content', '')
      methods.setValue('userId', '')
    }
  }, [post])

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
    if (post) {
      if (data && addRequestStatus === 'idle') {
        try {
          setAddRequestStatus('pending')
          dispatch(
            updatePost({
              id: post.id,
              title: data.title,
              body: data.content,
              userId: data.userId,
              reactions: post.reactions,
            })
          ).unwrap()
          navigate(`/post/${postId}`)
          resetHandler()
        } catch (err) {
          console.error('Failed to save post', err)
        } finally {
          setAddRequestStatus('idle')
        }
      }
    } else {
      if (data && addRequestStatus === 'idle') {
        try {
          setAddRequestStatus('pending')
          dispatch(
            addNewPost({ title: data.title, body: data.content, userId: data.userId })
          ).unwrap()
          resetHandler()
          navigate('/')
        } catch (err) {
          console.error('Failed to save post', err)
        } finally {
          setAddRequestStatus('idle')
        }
      }
    }
  })

  const onDeleteClicked = React.useCallback((post: IPost) => {
    try {
      setAddRequestStatus('pending')
      dispatch(
        deletePost({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId!,
          reactions: post.reactions,
        })
      ).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Failed to Delete post', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }, [])

  const authorName = React.useMemo(() => {
    if (post) {
      const user = users.find((user) => user.id === post.userId)
      return user!.name
    }
    return ''
  }, [post, users])

  return (
    <Container component={'section'} sx={{ mt: 10 }}>
      <Typography component={'h2'} textAlign={'center'} variant="h4">
        {postId === undefined ? 'Add' : 'Edit'} Posts Form
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
          <Select name={'userId'} label={'Author'} defaultValue={authorName}>
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
              {post ? 'Edit' : 'Add'} Post
            </Button>
            <Button type="reset" onClick={resetHandler}>
              Reset
            </Button>
            {post && (
              <Button
                variant="contained"
                color="error"
                onClick={() => onDeleteClicked(post as IPost)}
              >
                Delete Post
              </Button>
            )}
          </Box>
        </Container>
      </FormProvider>
    </Container>
  )
}

export default AddPostForm
