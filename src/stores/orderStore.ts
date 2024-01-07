import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const id = ref(0)
  const orders = ref([])  // @todo: add type

  const getOrders = computed(() => orders.value)
  const getFiltertOrders = computed((filter: String) => orders.value)

  function addOrder(order:any) {  // @todo: update type
    id.value++
    order.value.append({id, time_in: Date(), time_done: null, time_gone: null, order})
    return id;
  }

  function doneOrder(id:number, done:boolean = true){
    if(done){
      orders.value[id].time_done = Date()
    }
    else{
      orders.value[id].time_done = null
    }
  }

  function goneOrder(id:number, gone:boolean = true){
    if(gone){
      orders.value[id].time_gone = Date()
    }
    else{
      orders.value[id].time_gone = null
    }
  }

  return { count, doubleCount, increment }
})
