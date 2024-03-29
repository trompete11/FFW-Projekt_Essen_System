import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Order, type OrderItem } from '@/assets/interfaces'

export const useOrderStore = defineStore('orderStore', () => {
  const id = ref(0)
  const orders = ref([] as Order[])
  const filter = ref('open')

  const getOrders = computed(() => orders.value)
  orders.value.filter
  //const getFilter = computed(() => filter.value)
  const getFilterdOrders = computed((filter: String) => orders.value)
  const getFilteredOrders = computed(() => { 
    return {
      open: orders.value.filter((order) => order.time_done == null),
      done: orders.value.filter((order) => order.time_done !== null),
      oDone: orders.value.filter((order) => order.time_gone === null && order.time_done !== null),
      gone: orders.value.filter((order) => order.time_done !== null && order.time_gone !== null)
    }
  })


  function addOrder(order_items: OrderItem[], price: number = 0) {
    id.value++
    orders.value.push({
      id: id.value,
      time_in: Date(),
      time_done: null,
      time_gone: null,
      order_items,
      price_sum: price
    })
    return id
  }

  function doneOrder(orderId: number, done: boolean = true) {
    if (done) {
      orders.value[orderId].time_done = Date()
    } else {
      orders.value[orderId].time_done = null
      orders.value[orderId].time_gone = null
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
    const orderIndex = orders.value.findIndex((element) => (element.id === orderId))
    orders.value.splice(orderIndex, 1)
    orders.value.splice(orderId, 1)
  }

  return {
    id,
    orders,
    getOrders,
    getFilterdOrders,
    addOrder,
    doneOrder,
    goneOrder,
    stornoOrder,
    getFilteredOrders
  }
})
