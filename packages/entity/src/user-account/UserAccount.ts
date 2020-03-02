import { UserRole } from '../user-role'

export type UserAccount = {
  username: string
  password: string
  roles: Array<UserRole>
}
