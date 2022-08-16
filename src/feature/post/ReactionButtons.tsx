import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useAppDispatch } from '../../app/hook'

import { InitialStateProps, reactionAdded } from './postSlice'

interface IReactionButton {
  post: InitialStateProps
}

interface IreactionEmoji {
  thumbsUp: string
  wow: string
  heart: string
  rocket: string
  coffee: string
}

const reactionEmoji: IreactionEmoji = {
  thumbsUp: '👍',
  wow: '😯',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
}

const ReactionButtons: React.FC<IReactionButton> = ({ post }) => {
  const dispatch = useAppDispatch()

  const onClickhandler = React.useCallback((reactionName: string) => {
    dispatch(reactionAdded({ postId: post.id, reaction: reactionName }))
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {Object.entries(reactionEmoji).map(([reactionName, emoji]) => {
        return (
          <Button
            key={reactionName}
            onClick={() => onClickhandler(reactionName)}
            sx={{ p: 0, justifyContent: 'flex-start' }}
          >
            {emoji} {post.reactions[reactionName]}
          </Button>
        )
      })}
    </Box>
  )
}

export default ReactionButtons
