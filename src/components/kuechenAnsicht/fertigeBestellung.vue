<!-- Author: Emre Burak Koc -->
<!-- Component for displaying done orders in sidebar to uncheck them -->
<template>
  <div v-if="!orderStore.getOrders[props.orderId - 1].time_gone">
    <input type="checkbox" @change="setDone(props.orderId - 1, false)" checked />
    <span> Nr. #{{ props.orderId }}</span>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'
import { ref, reactive, watchEffect } from 'vue'

// defining properties 
const props = defineProps<{
  orderId: number
}>()
  
// getting state of done orders 
const orderStore = ref(useOrderStore())
const setDone = orderStore.doneOrder
//const gone = ref(orderStore.getOrders[props.orderId - 1].time_gone);
</script>

<style scoped></style>
