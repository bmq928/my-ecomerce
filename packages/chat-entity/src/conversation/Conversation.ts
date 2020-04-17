import { ID } from '../id'
import { Entity } from '../entity'

export type ConversationMember = {
  id: ID
  alias: string
}

export type ConversationConfig = {
  color: string
}

export type Conversation = Entity & {
  members: ConversationMember[]
  name: string
  config: ConversationConfig
}
