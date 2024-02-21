<template>
    <h2>Übersicht aller Gerichte</h2>
    <!--
    <div id="sum" v-for="order in orders" :key="order.id">
        <div v-for="dish in order.order_items" :key="dish.id">
            <span>{{ dish.count }}x {{ dish.item.name }}</span>
        </div>
    </div>
    -->

    <div v-for="[key, value] in Array.from(sumMap)" :key="key">
        <span>{{ value }}x {{ key }}</span>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/orderStore';
    import { ref, reactive, watchEffect } from 'vue';

    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);

    const sumMap: Map<string, number> = new Map();

    /*watchEffect(() => {
        orders.value.forEach(order => {
            for(const item of order.order_items){
                sumMap.set(item.item.name, item.count + (sumMap.get(item.item.name) ?? 0))
            }
        })
    })*/

    watchEffect(() => {
  orders.value.forEach((order) => {
    const reactiveOrder = reactive(order);
    for (const item of reactiveOrder.order_items) {
      const itemName = item.item.name;
      sumMap.set(itemName, item.count + (sumMap.get(itemName) ?? 0));
    }
  });
});
</script>