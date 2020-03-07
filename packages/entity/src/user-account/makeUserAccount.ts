import { UserAccount } from './UserAccount'
import { RawEntity, makeEntity } from '../entity'
import { makeUserRole, RawUserRole } from '../user-role'
import EntityError from '../EntityError'

export type RawUserAccount = RawEntity & {
  username: unknown
  password: unknown
  roles: unknown
}

function removeEscapeHtml(str: string): string {
  const rules = [
    {
      encode: /(\&lt)/g,
      str: '<',
    },
    {
      encode: /(\&gt)/g,
      str: '>',
    },
  ]
  let text = str
  for (const rule of rules) {
    text = text.replace(rule.encode, rule.str)
  }

  return text
}

export function makeUserAccount(o: RawUserAccount): UserAccount {
  if (typeof o.username !== 'string')
    throw new EntityError('username must be a string in UserAccount')
  if (typeof o.password !== 'string')
    throw new EntityError('password must be a string in UserAccount')
  if (typeof o.roles !== 'object')
    throw new EntityError('roles must be an array of roles in UserAccount')
  if (!(o.roles as object).hasOwnProperty('length'))
    throw new EntityError('roles must be an array of roles in UserAccount')

  const entity = makeEntity(o as RawEntity)

  return {
    ...entity,
    username: removeEscapeHtml(o.username),
    password: o.password,
    roles: (o.roles as Array<RawUserRole>).map(role => makeUserRole(role)),
  }
}
