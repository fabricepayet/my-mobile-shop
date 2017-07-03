export interface Shop {
  $key?: string,
  name: string,
  description: string,
  localisation?: {
    lat: number,
    lng: number
  },
  town?: string,
  address?: string,
  image?: string,
  logo?: string
}
