import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import { Col, Row } from 'antd'

import ConversationList from './components/ConversationList'
import ChatBoard from './components/ChatBoard'
import 'antd/dist/antd.css'
import './App.scss'

export default function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Row>
          <Col span={8}><ConversationList /></Col>
          <Col span={16}><ChatBoard /></Col>
        </Row>
      </ToastProvider>
    </div>
  )
}
