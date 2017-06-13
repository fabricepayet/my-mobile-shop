export interface Store {
  $key?: string,
  name: string,
  description: string,
  localisation?: {
    lat: number,
    lng: number
  },
  town?: string,
  address?: string
}
