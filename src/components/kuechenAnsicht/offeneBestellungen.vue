<template>
    <div>
        <h2>Offene Bestellungen</h2>
    </div>
    <div class="order-container" v-for="order in orders" :key="order.id">
        <Einzelbestellung order="order" />
    </div>
</template>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/orderStore';
    import EinzelBestellung from '@/components/kuechenAnsicht/einzelneBestellung.vue';

    const orderStore = useOrderStore();
    const orders = orderStore.getOrders;
</script>

<style scoped>
    .order-container {
        max-height: 800px;
        overflow-y: auto;
        border: 1px solid blue;
    }
</style>
