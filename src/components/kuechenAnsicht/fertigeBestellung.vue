<template>
  <div>
    <input type="checkbox" @change="setDone(props.orderId - 1, false)" checked />
    <span> Nr. #{{ props.orderId }}</span>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'
import { ref, reactive, watchEffect } from 'vue'
import { type Order } from '@/assets/interfaces'

const props = defineProps<{
  orderId: number
}>()

const orderStore = useOrderStore()
const setDone = orderStore.doneOrder
//const filteredOrders = ref(orderStore.getFilteredOrders.done);

/*watchEffect(() => {
    filteredOrders.value = orderStore.getFilteredOrders.done;
  })*/

/*const uncheck = (() => {
    console.log("entered uncheck");
    console.log("entered if");
    setDone(props.orderId-1, false);
  })*/
</script>

<style scoped></style>
