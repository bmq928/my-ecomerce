import { Entity } from '../entity'

export type Group = Entity & {
  name: string
  members: string[]
}
