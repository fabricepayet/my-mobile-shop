import { Store } from './store.interface';

export interface Product {
  name: string,
  description: string,
  photo: string,
  price: number,
  $key?: string,
  image?: string,
  timestamp?: number,
  store?: Store,
  storeRef: string
}
