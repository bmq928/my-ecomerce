import React from 'react'
import { List, Avatar, Row, Badge, Space } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { MessageOutlined, SettingOutlined } from '@ant-design/icons'

export default function ConversationList() {
  const data = [
    {
      name: 'Ana',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Bob',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Caitlyn',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Donald',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
    {
      name: 'Kame',
      lastMessage:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
    },
  ]
  return (
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={() => {}}
      hasMore={false}
    >
      <List
        style={{
          overflow: 'auto',
          height: '100vh',
          backgroundColor: 'white',
        }}
        bordered={true}
        itemLayout="horizontal"
        dataSource={data}
        header={
          <Row justify="end">
            <Space size="middle">
              <Badge count={19}>
                <MessageOutlined style={{ fontSize: 19 }} />
              </Badge>
              <SettingOutlined style={{ fontSize: 19 }} />
            </Space>
          </Row>
        }
        renderItem={(item) => (
          <List.Item style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              avatar={<Avatar>{item.name.substr(0, 1)}</Avatar>}
              title={<a href="ke">{item.name}</a>}
              description={<i>{item.lastMessage.substr(0, 40)}</i>}
            />

            <small>30.05.2020</small>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  )
}
