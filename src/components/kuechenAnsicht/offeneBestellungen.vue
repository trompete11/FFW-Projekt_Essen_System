<template>
    <div>
        <h2>Offene Bestellungen</h2>
    </div>
    <div id="order-container">
        <!-- <div v-if="selection == 'open'"> -->
            <div v-for="order in orders" :key="order.id">
                <EinzelBestellung v-if="!order.time_done" :order_id="order.id" :ords="order.order_items" :done="order"/>
            </div>
        <!-- </div> -->
        <!-- <div v-else>
            <div v-for="order in filteredOrders" :key="order.id">
                <EinzelBestellung :order_id="order.id" :ords="order.order_items"/>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import { useOrderStore } from '@/stores/orderStore';
    import EinzelBestellung from '@/components/kuechenAnsicht/einzelneBestellung.vue';

    const props = defineProps<{
        selection: string;
    }>();

    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);
    const filteredOrders = ref(orderStore.getFilterdOrders);

    watchEffect(() => {
        orders.value = orderStore.getOrders;
        filteredOrders.value = orderStore.getFilterdOrders
    });
</script>

<style scoped>
    #order-container {
        max-height: 800px;
        overflow-y: auto;
        border: 1px solid red;
    }
</style>
