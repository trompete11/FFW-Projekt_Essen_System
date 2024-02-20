<template>
  <div>
    <h1>Küche</h1>
    <button @click="addData">Add data</button>
    <div id="flex-container">
      <div id="single-orders">
        <OffeneBestellungen />
      </div>
      <div id="sum-dishes"> <!-- Summe aller Gerichte ohne Beilagen -->
        <SummeGerichte />
      </div>
      <div id="sidebar-right">
        <h2>SIDEBAR</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import OffeneBestellungen from '@/components/kuechenAnsicht/offeneBestellungen.vue';
  import SummeGerichte from '@/components/kuechenAnsicht/summeGerichte.vue';
  import { useOrderStore } from '@/stores/orderStore';
  import { type Order, type OrderItem, type FoodItem } from '@/assets/interfaces';
  import { ref } from 'vue';

  const orderStore = useOrderStore();
  const orders = ref(orderStore.getOrders);

  const addData = () => {
    const exampleOrderItem1: OrderItem = {
      count: 2,
      price_sum: 25.99,
      comment: "No onions",
      item: { id: 1, name: "Burger", price: 12.99 },
      extras: [{ id: 2, name: "Cheese", price: 1.99 }, { id: 3, name: "Chilli", price: 1.99 }]
    };

    const exampleOrderItem2: OrderItem = {
      count: 3,
      price_sum: 8.49,
      comment: null,
      item: { id: 3, name: "Pizza", price: 8.49 },
      extras: [{ id: 2, name: "Chilli", price: 1.99 }, { id: 3, name: "Onions", price: 1.99 }, { id: 3, name: "Thunfish", price: 1.99 }]
    };
    orderStore.addOrder([exampleOrderItem1, exampleOrderItem2]);
  }
</script>

<style scoped>
#flex-container{
  display: flex;
}

#single-orders{
  flex: 1;
}

#sum-dishes{
  flex: 1;
  margin-left: 10px;
}

#sidebar-right {
  flex: 0 0 auto;
}
</style>
