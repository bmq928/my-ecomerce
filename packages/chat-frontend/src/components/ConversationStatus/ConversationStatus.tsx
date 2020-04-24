import React from 'react'
import { Row } from 'antd'
import moment from 'moment'

type Props = {
  conversationName: string
  lastActiveTimeStamp: number
}

export default function ConversationStatus({
  conversationName,
  lastActiveTimeStamp,
}: Props) {
  return (
    <>
      <Row justify="center" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <strong>{conversationName}</strong>
      </Row>
      <Row justify="center" style={{ marginBottom: 0 }}>
        <small>{moment(lastActiveTimeStamp).fromNow()}</small>
      </Row>
    </>
  )
}
