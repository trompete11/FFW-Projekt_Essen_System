<template>
  <div>
    <h1>Küche</h1>
    <button @click="addData">Add data</button>
    <select v-model="selection" id="combo">
      <option value="open">Offene Bestellungen</option>
      <option value="filtered">Bearbeitete Bestellungen</option>
    </select>
    <div id="flex-container">
      <div id="single-orders">
        <OffeneBestellungen />
      </div>
      <div id="sum-dishes"> <!-- Summe aller Gerichte ohne Beilagen -->
        <SummeGerichte />
      </div>
      <div id="sidebar-right">
        <div id="vertical-flex-container">
          <div id="queue">
            <h2>Warteschlange</h2>
            <div id="red-queue">
              <span>ROT</span>
            </div>
            <div id="yellow-queue">
              <span>GELB</span>
            </div>
            <div id="green-queue">
              <span>GRÜN</span>
            </div>
          </div>
        </div>
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

  const selection: string = 'open';

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

#vertical-flex-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}

#queue {
  margin-right: 30px;
}

#queue > div {
  padding: 50px;
  margin-top: 10px;
  border: 5px solid black;
  text-align: center;
  font-size: 24pt;
}
</style>
