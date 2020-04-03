import { RawEntity, makeEntity } from '../entity'
import { Group } from './Group'
import EntityError from '../EntityError'

export type RawGroup = RawEntity & {
  name: unknown
  members: unknown
}

export function makeGroup(o: RawGroup): Group {
  if (o === null) return null

  const entity = makeEntity(o as RawEntity)

  if (typeof o.name !== 'string')
    throw new EntityError('name must be string in group')
  if (!Array.isArray(o.members))
    throw new EntityError('members must be string[] in group')

  for (const i in o.members) {
    const member = o.members[i]
    if (typeof member !== 'string')
      throw new EntityError(`members[${i}] must be string in group`)
  }

  return {
    ...entity,
    name: o.name,
    members: o.members,
  }
}
