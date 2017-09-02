import { Shop } from './shop.interface';
import { Product } from './product.interface';

export interface Reservation {
  userRef: string,
  product: Product,
  shop: Shop,
  productRef: string,
  shopRef: string,
  timestamp: number,
  userName: string,
  userEmail: string,
}
