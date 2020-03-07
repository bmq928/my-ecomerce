import { Entity } from '../entity'

export type UserInfo = Entity & {
  firstName: string
  lastName: string
  birthDay: number
}
