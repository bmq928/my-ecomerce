import { Entity } from '../entity'
import { ID } from '../id'

export type Message = Entity & {
  content: string
  from: ID
  to: ID
  timestamp: number
}
