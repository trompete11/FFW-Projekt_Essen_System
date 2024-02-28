<template>
    <h2>Übersicht aller Gerichte</h2>
    <div>
        <div v-for="[key, value] in sumMap" :key="key">
            <span>{{ value }}x {{ key }}</span>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/orderStore';
    import { ref, reactive, watch, watchEffect } from 'vue';
    import { type Order } from '@/assets/interfaces';
    
    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);

    //const sumMap: Map<string, number> = new Map();
    const sumMap = ref(new Map<string, number>);

    watch(orders.value, (n, ol) => {
    //watchEffect(() => {
        ol.forEach((order: Order) => {
            //console.log("A");
            const o = order;
            for (const item of order.order_items) {
                //console.log("B");
                const itemName = item.item.name;
                //console.log(sumMap.value.get(itemName));
                //console.log(itemName);
                sumMap.value.set(itemName, item.count + (sumMap.value.get(itemName) ?? 0));
                //console.log(sumMap.value.get(itemName));
            }
        });
    }), {deep: true};
</script>