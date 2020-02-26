import { Sale } from '../sale'

export type ValidDiscountUnit = '%' | 'VNĐ' | '$'

export type ProductOnSale = {
  sale: Sale
  discount: number
  discountUnit: ValidDiscountUnit
}
