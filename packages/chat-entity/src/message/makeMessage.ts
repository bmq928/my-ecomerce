import { Message } from './Message'
import { RawEntity, makeEntity } from '../entity'
import EntityError from '../EntityError'

export type RawMessage = RawEntity & {
  content: unknown
  from: unknown
  to: unknown
  type: unknown
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

  if (typeof o.from !== 'string')
    throw new EntityError('from must be string in message')
  if (typeof o.to !== 'string')
    throw new EntityError('to must be string in message')
  if (o.type !== 'direct' && o.type !== 'group')
    throw new EntityError('type must be direct or group in message')

  const entity = makeEntity(o as RawEntity)
  const content = makeMessageContent(o.content)
  const timestamp = makeTimeStamp(o.timestamp)
  return {
    ...entity,
    content,
    from: o.from,
    to: o.to,
    type: o.type,
    timestamp,
  }
}
