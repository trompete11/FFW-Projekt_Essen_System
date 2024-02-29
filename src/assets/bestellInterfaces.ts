import type { FoodItem } from '@/assets/interfaces'

export interface ButtonData {
  id: string
  type: 'checkbox' | 'button' | 'radio' | 'text' | 'hidden' | 'site' | 'addButton'
  name?: string
  style?: string
  ticked?: boolean
}

export interface BestellButtonData {
  btnData: ButtonData
  data: FoodItem | string
}
export interface ButtonSite {
  id: string
  buttons: BestellButtonData[][]
}

export interface ButtonGrid {
  startSite: string
  sites: ButtonSite[]
}
