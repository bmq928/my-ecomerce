import React from 'react'
import { List, Affix } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

import ConversationStatus from '../ConversationStatus'
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
          height: '92vh',
          padding: '0 20px',
        }}
        bordered={true}
        itemLayout="horizontal"
        dataSource={data}
        header={
          <Affix offsetTop={10}>
            <ConversationStatus
              conversationName={data[3].from}
              lastActiveTimeStamp={data[3].time}
            />
          </Affix>
        }
        renderItem={(item) => (
          <Message
            isOwner={isCurrentUser(item.from)}
            author={item.from}
            content={item.message}
            timestamp={item.time}
          />
        )}
      />
    </InfiniteScroll>
  )
}
