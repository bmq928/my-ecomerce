import React from 'react'
import { Comment, Avatar, Tooltip, Card } from 'antd'
import moment from 'moment'

type Props = {
  content: string
  author: string
  timestamp: number
  style? : React.CSSProperties
}

export default function Message({ content, author, timestamp, style }: Props) {
  return (
    <Comment
      style={style}
      author={author}
      avatar={<Avatar>{author.substr(0, 1)}</Avatar>}
      content={<Card style={{ width: '70vh' }}> {content}</Card>}
      datetime={
        <Tooltip title={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(timestamp).fromNow()}</span>
        </Tooltip>
      }
    />
  )
}
