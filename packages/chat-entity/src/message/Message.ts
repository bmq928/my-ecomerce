import { Entity } from '../entity'

export type Message = Entity & {
  content: string
  from: string
  to: string
  type: 'direct' | 'group'
  timestamp: number
}
