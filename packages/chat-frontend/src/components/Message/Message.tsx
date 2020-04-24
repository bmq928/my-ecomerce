import React from 'react'
import { Comment, Avatar, Tooltip, Card } from 'antd'
import moment from 'moment'

type Props = {
  content: string
  author: string
  timestamp: number
  isOwner: boolean
}

export default function Message({
  content,
  author,
  timestamp,
  isOwner,
}: Props) {
  const style = isOwner ? { marginLeft: '39%' } : {}
  const displayAvatar = isOwner ? null : <Avatar>{author.substr(0, 1)}</Avatar>
  const displayAuthor = isOwner ? 'You' : author

  return (
    <Comment
      style={style}
      author={displayAuthor}
      avatar={displayAvatar}
      content={<Card style={{ width: '70vh' }}> {content}</Card>}
      datetime={
        <Tooltip title={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(timestamp).fromNow()}</span>
        </Tooltip>
      }
    />
  )
}
