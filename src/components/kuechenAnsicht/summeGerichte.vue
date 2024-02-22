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
    import { ref, reactive, watchEffect } from 'vue';

    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);

    const sumMap: Map<string, number> = new Map();
//
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