export interface FoodItem {
  id: number
  name: string
  price: number
}

export interface OrderItem {
  count: number
  price_sum: number
  comment: string | null
  item: FoodItem
  extras: FoodItem[] | null
}

export interface Order {
  id: number
  time_in: string
  time_done: string | null
  time_gone: string | null
  order_items: OrderItem[]
}
