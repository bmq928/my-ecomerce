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

function makeUserAccountPassword(
  o: RawUserAccount,
  type: string | null
): string | null {
  if (typeof o.password !== 'string' || o.password !== null)
    throw new EntityError('password must be string or null in UserAccount')

  if (type === 'CREATE') return o.password
  return null
}

export function makeUserAccount(
  o: RawUserAccount,
  type: string | null
): UserAccount {
  if (typeof o.username !== 'string')
    throw new EntityError('username must be a string in UserAccount')
  if (typeof o.roles !== 'object')
    throw new EntityError('roles must be an array of roles in UserAccount')
  if (!(o.roles as object).hasOwnProperty('length'))
    throw new EntityError('roles must be an array of roles in UserAccount')

  const entity = makeEntity(o as RawEntity)

  return {
    ...entity,
    username: removeEscapeHtml(o.username),
    password: makeUserAccountPassword(o, type),
    roles: (o.roles as Array<RawUserRole>).map(role => makeUserRole(role)),
  }
}
