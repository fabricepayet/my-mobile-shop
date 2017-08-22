import { Shop } from './shop.interface';

export interface Product {
  name: string,
  description: string,
  photo: string,
  price: number,
  $key?: string,
  image?: string,
  timestamp?: number,
  shop?: Shop,
  shopRef: string,
  shopTown?: string,
  shopName?: string,
  discount?: number,
  finalPrice?: number,
  soldOut?: boolean,
}
