<template>
    <div>
        <h2>Offene Bestellungen</h2>
    </div>
    <div id="order-container">
        <div v-for="order in orders" :key="order.id">
            <EinzelBestellung :ords="order.order_items"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import { useOrderStore } from '@/stores/orderStore';
    import EinzelBestellung from '@/components/kuechenAnsicht/einzelneBestellung.vue';

    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);

    watchEffect(() => {
        orders.value = orderStore.getOrders;
    });
</script>

<style scoped>
    #order-container {
        max-height: 800px;
        overflow-y: auto;
        border: 1px solid red;
    }
</style>
