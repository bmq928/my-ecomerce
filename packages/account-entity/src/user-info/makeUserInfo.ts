import { UserInfo } from './UserInfo'
import { RawEntity, makeEntity } from '../entity'
import EntityError from '../EntityError'

export type RawUserInfo = RawEntity & {
  firstName: unknown
  lastName: unknown
  birthDay: unknown
}

export function makeUserInfo(o?: RawUserInfo): UserInfo {
  if(o === null) return null

  if (typeof o.firstName !== 'string')
    throw new EntityError('firstName must be a string in UserInfo')
  if (typeof o.lastName !== 'string')
    throw new EntityError('lastName must be a string in UserInfo')
  if (typeof o.birthDay !== 'number')
    throw new EntityError('birthDay must be a number in UserInfo')

  const entity = makeEntity(o as RawEntity)
  
  return {
    ...entity,
    firstName: o.firstName,
    lastName: o.lastName,
    birthDay: o.birthDay,
  }
}
