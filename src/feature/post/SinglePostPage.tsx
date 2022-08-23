import React from 'react'
import { useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '../../app/hook'

import Post from './Post'

import { IPost, selectPostById } from './postSlice'

const SinglePostPage: React.FC = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId as string)) as IPost

  return (
    <>
      {post && (
        <Container sx={{ mt: 10 }}>
          <Post
            id={post.id}
            title={post.title}
            content={post?.body}
            userId={post.userId!}
            date={post.date}
            post={post}
          />
        </Container>
      )}
      {!post && (
        <section>
          <Typography variant="h5" component="h2" textAlign={'center'}>
            Post not found
          </Typography>
        </section>
      )}
    </>
  )
}

export default SinglePostPage
