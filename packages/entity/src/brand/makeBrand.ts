import EntityError from '../EntityError'
import { Brand } from './Brand'

type RawBrand = {
  code: unknown
  name: unknown
}

export function makeBrand(o?: RawBrand): Brand {
  if(o === null) return null

  if (typeof o.code !== 'string')
    throw new EntityError('code must be a string in brand')

  if (typeof o.name !== 'string')
    throw new EntityError('name must be a string in brand')

  return {
    code: o.code as string,
    name: o.name as string,
  }
}
