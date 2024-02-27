import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Order, type OrderItem } from '@/assets/interfaces'

export const useOrderStore = defineStore('orderStore', () => {
  const id = ref(0)
  const orders = ref([] as Order[])
  const filter = ref('open');

  const getOrders = computed(() => orders.value)
  orders.value.filter
  const getFilter = computed(() => filter.value)
  const getFilterdOrders = computed((filter: String) => orders.value) // @todo: implementation
  const getFilteredOrders = computed(() => filterOrders(filter.value));
  const getDoneOrders = computed(() => { 
    return {
      open: orders.value.filter((order) => order.time_done == null), 
      done: orders.value.filter((order) => order.time_done !== null)
    }
    /*if(f == 'open'){
      orders.value.filter(order => order.time_done == null)
    } else if(f == 'done'){
      orders.value.filter(order => order.time_done !== null)
    }*/
  });

  function addOrder(order_items:OrderItem[]) {
    id.value++
    orders.value.push({id: id.value, time_in: Date(), time_done: null, time_gone: null, order_items})
    return id;
  }

  function doneOrder(orderId:number, done:boolean = true){
    if(done){
      orders.value[orderId].time_done = Date()
    }
    else{
      orders.value[orderId].time_done = null
    }
  }

  function goneOrder(orderId:number, gone:boolean = true){
    if(gone){
      orders.value[orderId].time_gone = Date()
    }
    else{
      orders.value[orderId].time_gone = null
    }
  }

  function stornoOrder(orderId:number){
    orders.value.splice(orderId, 1)
  }

  return { id, orders, getOrders, getFilterdOrders, addOrder, doneOrder, goneOrder, stornoOrder, getFilter, getFilteredOrders, getDoneOrders }
})
