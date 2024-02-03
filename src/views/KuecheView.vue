<script setup lang="ts">
import ToDoList from '@/components/ToDoList.vue';
import { type Order } from '@/assets/interfaces';
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore();

function addOrder(){
      orderStore.addOrder([{
          id: 0,
          count: 0,
          price_sum: 0,
          comment: null,
          item: {id: 0, name: "Test", price: 0},
          extras: [{id: 0, name: "Test Extra", price: 0}]
        }]
      )
    }

</script>

<template>
  <div>
    <h1>Küche</h1>
    <button @click="addOrder()">Add</button>
    <ToDoList :items="orderStore.getOrders"></ToDoList>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {

  },
  created: function () {

  },
  beforeUpdate: function () {
  }
}
</script>

<style scoped>

</style>
