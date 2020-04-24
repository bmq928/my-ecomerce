import React from 'react'
import { Input, Space } from 'antd'
import { SmileOutlined, PaperClipOutlined } from '@ant-design/icons'

export default function ChatInput() {
  return (
    <>
      <Input.TextArea
        style={{ height: '8vh', width: '90%' }}
        placeholder="Type some text"
      />

      <Space size="small" style={{ marginBottom: '2vh', marginLeft: '10px' }}>
        <PaperClipOutlined style={{ fontSize: 20 }} />
        <SmileOutlined style={{ fontSize: 20 }} />
      </Space>
    </>
  )
}
