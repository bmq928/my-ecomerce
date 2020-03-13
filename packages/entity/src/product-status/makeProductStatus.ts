import { ProductOnSale, ValidDiscountUnit } from './ProductOnSale'
import { ProductStatus } from './ProductStatus'
import { makeSale } from '../sale'
import EntityError from '../EntityError'

type RawProductOnSale = {
  sale: null | {
    name: unknown
    from: unknown
    end: unknown
  }
  discount: unknown
  discountUnit: unknown
}

type RawProductStatus = {
  type: unknown
  info: RawProductOnSale | unknown
}

function makeOnsaleProductStatus(o?: RawProductOnSale): ProductOnSale {
  if(o === null) return null

  if (typeof o.discount !== 'number')
    throw new EntityError('discount must be number in ProductOnSale')
  if (typeof o.discountUnit !== 'string')
    throw new EntityError('discountUnit must be string in ProductOnSale')

  const isValidDiscountUnit =
    o.discountUnit === '%' || o.discountUnit === 'VNĐ' || o.discountUnit === '$'

  if (!isValidDiscountUnit)
    throw new EntityError('discountUnit is invalid in ProductOnSale')
  
  return {
    sale: makeSale(o.sale),
    discount: o.discount,
    discountUnit: o.discountUnit as ValidDiscountUnit,
  }
}

export function makeProductStatus(o?: RawProductStatus): ProductStatus {
  if(o === null) return null

  if (typeof o.type !== 'string')
    throw new EntityError('type must be string in productStatus')

  switch (o.type) {
    case 'normal':
      return {
        type: o.type,
        info: {},
      }
    case 'out-of-stock':
      return {
        type: o.type,
        info: {},
      }
    case 'on-sale':
      return {
        type: 'on-sale',
        info: makeOnsaleProductStatus(o.info as RawProductOnSale),
      }
  }

  throw new EntityError('type attribute in ProductStatus is invalid')
}
