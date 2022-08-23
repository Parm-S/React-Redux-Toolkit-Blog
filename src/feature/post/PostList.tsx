import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useAppSelector, useAppDispatch } from '../../app/hook'
import Post from './Post'

import { getPostsError, getPostsStatus, IPost, selectAllPosts } from './postSlice'
import { Container } from '@mui/system'

const PostList: React.FC = () => {
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  const [isLoading, setIsLoading] = React.useState<boolean>()

  const [isPost, setIsPost] = React.useState<boolean>()

  const [isError, setIsError] = React.useState<boolean>()

  const effect = React.useRef(false)

  React.useEffect(() => {
    if (postStatus === 'loading') {
      setIsLoading(true)
      setIsError(false)
      setIsPost(false)
    } else if (postStatus === 'succeeded') {
      setIsPost(true)
      setIsLoading(false)
      setIsError(false)
    } else if (postStatus === 'failed') {
      setIsError(true)
      setIsPost(false)
      setIsLoading(false)
    }

    return () => {
      setIsLoading(false)
      setIsPost(false)
      setIsPost(false)
    }
  }, [postStatus])

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Container component="section" sx={{ mt: 10 }}>
      {isLoading && (
        <Typography textAlign={'center'} variant="body1">
          Loading...
        </Typography>
      )}
      {isPost && (
        <Grid
          container
          spacing={1}
          columns={{ xs: 1, md: 12 }}
          sx={{
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {orderedPosts.map((post: IPost) => (
            <Grid
              item
              xs={1}
              md={4}
              key={post.id}
              sx={{
                display: 'flex',
              }}
            >
              <Post
                id={post.id}
                title={post.title}
                content={post.body}
                userId={post.userId!}
                date={post.date}
                post={post}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {isError && (
        <Typography textAlign={'center'} variant="h4">
          {error}
        </Typography>
      )}
    </Container>
  )
}

export default PostList
