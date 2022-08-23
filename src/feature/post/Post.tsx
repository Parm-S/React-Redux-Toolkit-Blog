import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'

import { Link, useNavigate, useParams } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import { IPost } from './postSlice'
import Box from '@mui/material/Box'

interface IPostProps {
  id: string | number
  title: string
  content: string
  userId: string | number
  date: string
  post: IPost
}

const Post: React.FC<IPostProps> = ({ id, title, content, userId, date, post }) => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const clickHandler = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      navigate(`/post/edit/${postId}`)
    },
    [postId]
  )

  return (
    <Card sx={{ width: 1 }}>
      <CardActionArea component={Link} to={`post/${id}`}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              wordBreak: 'break-all',
            }}
          >
            {postId === undefined ? `${title.substring(0, 20)}...` : title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              wordBreak: 'break-all',
            }}
          >
            {postId === undefined ? `${content.substring(0, 75)}...` : content}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {postId && <Button onClick={clickHandler}>Edit Post</Button>}
            <PostAuthor userId={userId} />
            <TimeAgo timeStamp={date} />
          </Box>
          <ReactionButtons post={post} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post
