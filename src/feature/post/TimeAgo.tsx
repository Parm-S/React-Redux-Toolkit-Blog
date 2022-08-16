import React from 'react'

import { parseISO, formatDistanceToNow } from 'date-fns'
import { Typography } from '@mui/material'

interface ITimeAgo {
  timeStamp: string
}

const TimeAgo: React.FC<ITimeAgo> = ({ timeStamp }) => {
  const timeAgo = React.useMemo(() => {
    if (timeStamp) {
      const date = parseISO(timeStamp)
      const timePeriod = formatDistanceToNow(date)
      return `${timePeriod} ago`
    }
    return ''
  }, [timeStamp])

  return (
    <Typography component="span">
      <i>{timeAgo}</i>
    </Typography>
  )
}

export default TimeAgo
