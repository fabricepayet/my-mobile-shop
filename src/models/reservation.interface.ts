import { Store } from './store.interface';
import { Product } from './product.interface';

export interface Reservation {
  user_uid: string,
  product: Product,
  store: Store
}
