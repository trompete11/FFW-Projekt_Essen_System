<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore';

  const orderStore = useOrderStore();
  
</script>
<template>
  <div>
    <h1>Küche</h1>
    <div v-for="order in orderStore.getOrders" v-bind:key="order.id">{{ order.id }} {{ order.price_sum }}</div>
  </div>
</template>

<style scoped></style>
