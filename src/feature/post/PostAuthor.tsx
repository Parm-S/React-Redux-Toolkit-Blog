import React from 'react'

import Typography  from '@mui/material/Typography'

import { useAppSelector } from '../../app/hook'

import { selectAllUsers } from '../users/userSlice'

interface IPostAuthor {
  userId: String | number
}

const PostAuthor: React.FC<IPostAuthor> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers)

  const author = users.find((user) => user.id == userId)

  return <Typography variant="body1" color="text.secondary" pr={1}>by {author ? author.name : 'unknown user'}</Typography>
}

export default PostAuthor
