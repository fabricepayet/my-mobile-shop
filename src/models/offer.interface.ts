import { Product } from './product.interface'

export interface Offer {
  name: string,
  beginDate: Date,
  endDate: Date,
  product: Product
}
