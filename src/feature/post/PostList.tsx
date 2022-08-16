import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '../../app/hook'
import Post from './Post'

import { InitialStateProps, selectAllPosts } from './postSlice'
import { Container } from '@mui/system'

const PostList: React.FC = () => {
  const posts = useAppSelector(selectAllPosts)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Container component="section">
      <Typography component="h2" variant="h4" textAlign={'center'}>
        Posts
      </Typography>
      <Grid
        container
        spacing={4}
        columns={{ xs: 1, md: 12 }}
        sx={{
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {orderedPosts.map((post: InitialStateProps) => (
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
              postId={post.id}
              title={post.title}
              content={post.content}
              userId={post.userId!}
              date={post.date}
              post={post}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default PostList
