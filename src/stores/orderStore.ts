import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Order, type OrderItem } from '@/assets/interfaces'

export const useOrderStore = defineStore('orderStore', () => {
  const id = ref(0)
  const orders = ref([] as Order[])

  const getOrders = computed(() => orders.value)
  const getFilterdOrders = computed((filter: String) => orders.value) // @todo: implementation

  function addOrder(order_items: OrderItem[]) {
    id.value++
    orders.value.push({
      id: id.value,
      time_in: Date(),
      time_done: null,
      time_gone: null,
      order_items
    })
    return id
  }

  function doneOrder(orderId: number, done: boolean = true) {
    if (done) {
      orders.value[orderId].time_done = Date()
    } else {
      orders.value[orderId].time_done = null
    }
  }

  function goneOrder(orderId: number, gone: boolean = true) {
    if (gone) {
      orders.value[orderId].time_gone = Date()
    } else {
      orders.value[orderId].time_gone = null
    }
  }

  function stornoOrder(orderId: number) {
    orders.value.splice(orderId, 1)
  }

  return { id, orders, getOrders, getFilterdOrders, addOrder, doneOrder, goneOrder, stornoOrder }
})
