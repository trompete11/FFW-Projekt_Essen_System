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

  const orderStore = useOrderStore();
  const orders = orderStore.getOrders;

  const addData = () => {
    const exampleOrderItem1: OrderItem = {
      count: 2,
      price_sum: 25.99,
      comment: "No onions",
      item: { id: 1, name: "Burger", price: 12.99 },
      extras: [{ id: 2, name: "Cheese", price: 1.99 }]
    };

    const exampleOrderItem2: OrderItem = {
      count: 1,
      price_sum: 8.49,
      comment: null,
      item: { id: 3, name: "Salad", price: 8.49 },
     extras: null
    };
    /*
    const samples = [
      {count: 1, price_sum: 1.0, comment: "TEST", item: {id: 1, name: "ESSEN", price: 2.0}, extra: null},
    ];*/
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
