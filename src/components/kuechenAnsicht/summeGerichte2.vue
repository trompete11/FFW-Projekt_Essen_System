<!-- Author: Emre Burak Koc -->
<!-- Component for sum of all dishes -->
<template>
    <h2>Übersicht aller Gerichte</h2>
    <div> <!-- iterating over all dishes and its count in sumMap -->
        <div v-for="[key, value] in sumMap" :key="key">
            <span id="sum">{{ value }}x {{ key }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/orderStore';
    import { ref, reactive, watch, watchEffect, computed } from 'vue';
    import { type Order } from '@/assets/interfaces';

    // getting states of all orders
    const orderStore = useOrderStore();
    const orders = ref(orderStore.getFilteredOrders);

    // sumMap stores the count of all single dishes
    // sumMap is updated by iterating ove rall done orders
    // if the key does not exist, the count is added to 
    // else the previous value of is added to the new value
    const sumMap = computed(() => {
        const newMap = new Map<string, number>;
            orders.value.open.forEach((order: Order) => {
            for(const items of order.order_items){
                const itemName = items.item.name;
                const currentCount = newMap.get(itemName);
                newMap.set(itemName, items.count + (currentCount ?? 0));
            }
        })
        return newMap;
    })

    // updating orders
    watchEffect(() =>{
        orders.value = orderStore.getFilteredOrders;
    })
</script>

<style scoped>
    #sum {
        font-size: 20pt;
    }
</style>
