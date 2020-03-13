import { Category } from './Category'
import EntityError from '../EntityError'

type RawCategory = {
  id: unknown
  code: unknown
  name: unknown
  parentCategory: unknown
}

export function makeCategory(o?: RawCategory): Category {
  if(o === null) return null

  if (typeof o.id !== 'number')
    throw new EntityError('id must be a number in category')
  if (typeof o.code !== 'string')
    throw new EntityError('code must be a string in category')
  if (typeof o.name !== 'string')
    throw new EntityError('name must be a string in category')
  if (o.parentCategory === null || o.parentCategory === undefined)
    return {
      id: o.id as number,
      code: o.code as string,
      name: o.name as string,
      parentCategory: null,
    }

  return {
    id: o.id as number,
    code: o.code as string,
    name: o.name as string,
    parentCategory: makeCategory(o.parentCategory as RawCategory),
  }
}
