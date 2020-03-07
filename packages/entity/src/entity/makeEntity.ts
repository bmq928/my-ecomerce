import EntityError from '../EntityError'
import { Entity } from './Entity'

export type RawEntity = {
  id: unknown
}

export function makeEntity(o: RawEntity): Entity {
  if (typeof o.id !== 'string')
    throw new EntityError('name must be a string in entity')

  return {
    id: o.id,
  }
}
