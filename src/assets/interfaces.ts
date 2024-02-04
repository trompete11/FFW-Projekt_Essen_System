export interface FoodItem {
    id: number
    name: string
    price: number
}

export interface OrderItem {
    id: number
    count: number
    done: number
    price_sum: number
    comment: string | null
    item: FoodItem
    extras: FoodItem[] | null
}

export interface Order {
    id: number
    time_in: Date
    time_done: Date | null
    time_gone: Date | null
    order_items: OrderItem[]
}