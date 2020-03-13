import { Sale } from './Sale'
import EntityError from '../EntityError'

type RawSale = {
  name: unknown
  from: unknown
  end: unknown
}

export function makeSale(o?: RawSale): Sale {
  if(o === null) return null

  if(typeof o.name !== 'string') throw new EntityError('name must be a string in sale')
  if(typeof o.from !== 'number') throw new EntityError('from must be a string in sale')
  if(typeof o.end !== 'number') throw new EntityError('end must be a string in sale')

  return {
    name: o.name,
    from: o.from,
    end: o.end
  }
}
