import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { IPost } from './postSlice'

interface IPostProps {
  postId: string | number
  title: string
  content: string
  userId: string | number
  date: string
  post: IPost
}

const Post: React.FC<IPostProps> = ({ postId, title, content, userId, date, post }) => {
  return (
    <Card sx={{ width: 1 }}>
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
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            wordBreak: 'break-all',
          }}
        >
          {content}
        </Typography>
        <PostAuthor userId={userId} />
        <TimeAgo timeStamp={date} />
        <ReactionButtons post={post} />
      </CardContent>
    </Card>
  )
}

export default Post
