import { Entity } from './Entity'
import { makeID } from '../id'

export type RawEntity = {
  id: unknown
}

export function makeEntity(o?: RawEntity): Entity {
  if (o === null) return null
  return {
    id: makeID(o.id),
  }
}
