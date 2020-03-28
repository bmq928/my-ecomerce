import { UserRole } from '../user-role'
import { Entity } from '../entity'

export type UserAccount = Entity & {
  username: string
  password: string | undefined
  roles: Array<UserRole>
}
