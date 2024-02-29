<template>
  <div id="order-container">
    <div v-if="selection == 'open'">
      <h2>Offene Bestellungen: {{ orderStore.getFilteredOrders.open.length }}</h2>
      <div v-for="order in filteredOrders.open" :key="order.id">
        <EinzelBestellung :orderId="order.id" :ords="order.order_items" />
      </div>
    </div>
    <div v-else>
      <h2>Fertige Bestellungen: {{ orderStore.getFilteredOrders.done.length }}</h2>
      <div v-for="order in filteredOrders.done" :key="order.id">
        <EinzelBestellung :order-id="order.id" :ords="order.order_items" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import EinzelBestellung from '@/components/kuechenAnsicht/einzelneBestellung.vue'

const props = defineProps<{
  selection: string
}>()

const orderStore = useOrderStore()
const filteredOrders = ref(orderStore.getFilteredOrders)

watchEffect(() => {
  filteredOrders.value = orderStore.getFilteredOrders
})
</script>

<style scoped>
  #order-container {
    max-height: 800px;
    overflow-y: auto;
  }
</style>
