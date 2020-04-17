import {
  Conversation,
  ConversationConfig,
  ConversationMember,
} from './Conversation'
import { EntityError } from '..'
import { makeID } from '../id'
import { RawEntity, makeEntity } from '../entity'

export type RawConversation = RawEntity & {
  members: unknown
  name: unknown
  config: unknown
}

export type RawConversationConfig = {
  color: unknown
}

export type RawConversationMember = {
  id: unknown
  alias: unknown
}

export function makeConversationConfig(
  o: RawConversationConfig
): ConversationConfig {
  const defaultConfig = {
    color: 'white',
  }

  if (o === null) return defaultConfig

  const color = o.color || defaultConfig.color
  if (typeof color !== 'string')
    throw new EntityError('color must be string in conversation-config')

  return {
    color,
  }
}

export function makeConversationMember(
  o: RawConversationMember
): ConversationMember {
  if (o === null) throw new EntityError('conversation member must not be null')

  const alias = o.alias || ''

  if (o.id === null)
    throw new EntityError("conversation member 's id must not be null")
  if (typeof alias !== 'string')
    throw new EntityError("conversation member 's alias must be string")

  return {
    alias,
    id: makeID(o.id),
  }
}

export function makeConversation(o: RawConversation): Conversation {
  if (o === null) return null
  if (Array.isArray(o.members))
    throw new EntityError('conversation members must be list')
  if (typeof o.name !== 'string')
    throw new EntityError('name must be string in conversation')

  const members = o.members as ConversationMember[]

  return {
    ...makeEntity(o as RawEntity),
    name: o.name,
    members: members.map((m) => makeConversationMember(m)),
    config: makeConversationConfig(o.config as RawConversationConfig),
  }
}
