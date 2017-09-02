import { Shop } from './shop.interface';
import { Product } from './product.interface';

export interface Reservation {
  user: string,
  product: Product,
  shop: Shop,
  state?: string
  productRef: string,
  shopRef: string,
  timestamp: number,
}
