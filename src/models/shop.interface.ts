export interface Shop {
  $key?: string,
  name: string,
  activity: string,
  localisation?: {
    lat: number,
    lng: number
  },
  town?: string,
  address?: string,
  image?: string,
  logo?: string
}
