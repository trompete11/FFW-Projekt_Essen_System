<template>
  <div>
    <h1>Küche</h1>
    <button @click="addData">Add data</button>
    <select v-model="filter" id="combo">
      <option value="open">Offene Bestellungen</option>
      <option value="done">Fertige Bestellungen</option>
    </select>
    <div id="flex-container">
      <div id="single-orders">
        <OffeneBestellungen :selection="filter" />
      </div>
      <div id="sum-dishes">
        <SummeGerichte />
      </div>
      <div id="sidebar-right">
        <SidebarRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OffeneBestellungen from '@/components/kuechenAnsicht/offeneBestellungen.vue'
import SummeGerichte from '@/components/kuechenAnsicht/summeGerichte2.vue'
import SidebarRight from '@/components/kuechenAnsicht/sidebar.vue'
import { useOrderStore } from '@/stores/orderStore'
import { type Order, type OrderItem, type FoodItem } from '@/assets/interfaces'
import { ref } from 'vue'

const filter = ref('open')

const orderStore = useOrderStore()

const addData = () => {
  const exampleOrderItem1 = {
    count: 2,
    price_sum: 25.99,
    comment: "No onions",
    item: { id: 1, name: "Burger", price: 12.99 },
    extras: [{ id: 2, name: "Cheese", price: 1.99 }, { id: 3, name: "Chilli", price: 1.99 }]
  };

  const exampleOrderItem2 = {
    count: 3,
    price_sum: 8.49,
    comment: null,
    item: { id: 3, name: "Pizza", price: 8.49 },
    extras: [{ id: 2, name: "Chilli", price: 1.99 }, { id: 3, name: "Onions", price: 1.99 }, { id: 3, name: "Thunfish", price: 1.99 }]
  };

  const exampleOrderItem3 = {
    count: 1,
    price_sum: 15.99,
    comment: null,
    item: { id: 2, name: "Salad", price: 15.99 },
    extras: [{ id: 4, name: "Chicken", price: 3.99 }, { id: 5, name: "Dressing", price: 0.99 }]
  };

  const exampleOrderItem4 = {
    count: 4,
    price_sum: 30.99,
    comment: "Extra cheese",
    item: { id: 4, name: "Pasta", price: 7.49 },
    extras: [{ id: 6, name: "Parmesan", price: 2.49 }, { id: 7, name: "Basil", price: 1.49 }]
  };

  orderStore.addOrder([exampleOrderItem1, exampleOrderItem2, exampleOrderItem3, exampleOrderItem4]);

  const dlongOrderItems = [
    {
      count: 2,
      price_sum: 25.99,
      comment: "No onions",
      item: { id: 1, name: "Burger", price: 12.99 },
      extras: [{ id: 2, name: "Cheese", price: 1.99 }, { id: 3, name: "Chilli", price: 1.99 }]
    },
    {
      count: 3,
      price_sum: 8.49,
      comment: null,
      item: { id: 3, name: "Pizza", price: 8.49 },
      extras: [{ id: 2, name: "Chilli", price: 1.99 }, { id: 3, name: "Onions", price: 1.99 }, { id: 3, name: "Thunfish", price: 1.99 }]
    },
    {
      count: 1,
      price_sum: 15.99,
      comment: null,
      item: { id: 2, name: "Salad", price: 15.99 },
      extras: [{ id: 4, name: "Chicken", price: 3.99 }, { id: 5, name: "Dressing", price: 0.99 }]
    },
    {
      count: 4,
      price_sum: 30.99,
      comment: "Extra cheese",
      item: { id: 4, name: "Pasta", price: 7.49 },
      extras: [{ id: 6, name: "Parmesan", price: 2.49 }, { id: 7, name: "Basil", price: 1.49 }]
    },
  ];

  orderStore.addOrder(dlongOrderItems);
}
const addData = () => {
  const exampleOrderItem1: OrderItem = {
    count: 2,
    price_sum: 25.99,
    comment: 'No onions',
    item: { id: 1, name: 'Burger', price: 12.99 },
    extras: [
      { id: 2, name: 'Cheese', price: 1.99 },
      { id: 3, name: 'Chilli', price: 1.99 }
    ]
  }

  const exampleOrderItem2: OrderItem = {
    count: 3,
    price_sum: 8.49,
    comment: null,
    item: { id: 3, name: 'Pizza', price: 8.49 },
    extras: [
      { id: 2, name: 'Chilli', price: 1.99 },
      { id: 3, name: 'Onions', price: 1.99 },
      { id: 3, name: 'Thunfish', price: 1.99 }
    ]
  }
  orderStore.addOrder([exampleOrderItem1, exampleOrderItem2])
}
</script>

<style scoped>
#flex-container {
  display: flex;
}

#single-orders {
  flex: 1;
  margin-left: 1%;
}

#sum-dishes {
  flex: 1;
  text-align: center;
}

#sidebar-right {
  flex: 0 0 auto;
  margin-right: 1%;
}
</style>

<style>
  h2 {
    text-decoration: underline;
    line-height: 1.5;
    text-align: center;
  }
</style>
