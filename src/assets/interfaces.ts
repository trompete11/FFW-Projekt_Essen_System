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
    id: number | null
    time_in: Date
    time_done: Date
    time_gone: Date
    order_items: OrderItem[]
}