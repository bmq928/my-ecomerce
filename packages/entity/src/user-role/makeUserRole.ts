import { UserRole } from './UserRole'
import EntityError from '../EntityError'

export type RawUserRole = {
  name: unknown
}

export function makeUserRole(o: RawUserRole): UserRole {
  if (typeof o.name !== 'string')
    throw new EntityError('name must be a string in UserRole')

  return {
    name: o.name,
  }
}
