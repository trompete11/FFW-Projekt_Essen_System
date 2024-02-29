export interface FoodItem {
  id: number
  name: string
  description?: string | null
  price: number
  extra: boolean
}

export interface OrderItem {
  count: number
  price_sum: number
  comment?: string | null
  item: FoodItem
  extras: FoodItem[]
}

export interface Order {
  id: number
  time_in: string
  time_done: string | null
  time_gone: string | null
  order_items: OrderItem[]
  price_sum: number
}
