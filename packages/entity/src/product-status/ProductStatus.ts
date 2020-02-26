import { ProductNormal } from './ProductNormal'
import { ProductOutOfStock } from './ProductOutOfStock'
import { ProductOnSale } from './ProductOnSale'

export type ProductStatus = {
  type: 'normal' | 'on-sale' | 'out-of-stock'
  info: ProductNormal | ProductOnSale | ProductOutOfStock
}
