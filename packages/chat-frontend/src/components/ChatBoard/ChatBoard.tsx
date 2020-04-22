import React from 'react'
import { List } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

import Message from '../Message'

export default function ChatBoard() {
  const data = [
    {
      from: 'Ana',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Bob',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Caitlyn',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Donald',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
    {
      from: 'Kame',
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci earum eius amet necessitatibus. Blanditiis praesentium nobis, facere ducimus, beatae tempora maxime aut vitae nisi soluta alias accusantium aliquid expedita eum.',
      time: Date.now(),
    },
  ]

  function isCurrentUser(author: string): boolean {
    return author === 'Ana'
  }

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
          padding: '0 20px',
        }}
        bordered={true}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <Message
            style={{ marginLeft: isCurrentUser(item.from) ? '39%' : '0' }}
            author={item.from}
            content={item.message}
            timestamp={item.time}
          />
        )}
      />
    </InfiniteScroll>
  )
}
