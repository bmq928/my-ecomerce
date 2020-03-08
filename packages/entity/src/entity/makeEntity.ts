import { v4 as uuid } from 'uuid'
import EntityError from '../EntityError'
import { Entity } from './Entity'

export type RawEntity = {
  id: unknown
}

export function makeEntity(o: RawEntity): Entity {
  if (!o.id) return { id: uuid() }
  if (typeof o.id === 'number' || typeof o.id === 'string')
    return {
      id: o.id,
    }

  throw new EntityError('id must be a string in entity')
}
