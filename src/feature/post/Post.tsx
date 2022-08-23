import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

import { Link, useParams } from 'react-router-dom'

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
          <Box>
            <PostAuthor userId={userId} />
            <TimeAgo timeStamp={date} />
            <ReactionButtons post={post} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post
