<template>
    <div>
        <h2>Offene Bestellungen</h2>
    </div>
    <div id="order-container">
        <div v-if="selection == 'open'">
            <div v-for="order in filteredOrders.open" :key="order.id">
                <EinzelBestellung :order_id="order.id" :ords="order.order_items" :done="order"/>
            </div>
        </div>
        <div v-else>
            <div v-for="order in filteredOrders.done" :key="order.id">
                <EinzelBestellung :order_id="order.id" :ords="order.order_items" />
            </div>
        </div>
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
    const filter = ref(orderStore.getFilter);
    const filteredOrders = ref(orderStore.getDoneOrders);

    watchEffect(() => {
        //orders.value = orderStore.getOrders;
        filteredOrders.value = orderStore.getDoneOrders;
        console.log(filter.value);
    });
</script>

<style scoped>
    #order-container {
        max-height: 800px;
        overflow-y: auto;
        border: 1px solid red;
    }
</style>
