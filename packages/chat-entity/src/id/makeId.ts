import { v4 as uuid } from 'uuid'

import { ID } from './ID'
import EntityError from '../EntityError'

export function makeID(id: unknown): ID {
  if (!id) return uuid()
  if (typeof id === 'number' || typeof id === 'string') return id
  throw new EntityError('id must be a string or number')
}
