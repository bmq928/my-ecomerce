import { Message } from './Message'
import { RawEntity, makeEntity } from '../entity'
import EntityError from '../EntityError'
import { makeID } from '../id'

export type RawMessage = RawEntity & {
  content: unknown
  from: unknown
  to: unknown
  timestamp: unknown
}

function sanitizeText(s: string): string {
  return s.replace(/\</g, '&lt').replace(/\>/g, '&gt')
}

function makeMessageContent(content: unknown): string {
  if (typeof content !== 'string')
    throw new EntityError('content must be string in message')

  return sanitizeText(content)
}

function makeTimeStamp(timestamp: unknown): number {
  if (timestamp === null || timestamp === undefined) return Date.now()
  if (typeof timestamp !== 'number')
    throw new EntityError('timestamp must be string in message')

  return timestamp
}

export function makeMessage(o: RawMessage): Message {
  if (o === null) return null

  return {
    ...makeEntity(o as RawEntity),
    content: makeMessageContent(o.content),
    from: makeID(o.from),
    to: makeID(o.to),
    timestamp: makeTimeStamp(o.timestamp),
  }
}
