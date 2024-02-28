<template>
    <div class="orders-container">
        <li v-for="order in filteredOrders" :key="order.id" class="order-item" @click="handleOrderClick(order)">
            <OrderBox :order="order" />
        </li>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import OrderBox from '@/components/ausgabeAnsicht/OrderBox.vue';

export default {
    props: ['filterSelection'],
    setup(props) {
        const orderStore = useOrderStore();
        const orders = orderStore.getOrders;

        const filteredOrders = computed(() => {
            console.log(props.filterSelection)
            if (props.filterSelection === 'ready') {
                return orders.filter(order => order.time_gone === null && order.time_done !== null && order.time_done !== undefined);
            } else if (props.filterSelection === 'build') {
                return orders.filter(order => order.time_done === null || order.time_done === undefined && order.time_gone === null);
            } else {
                return orders;
            }
        });

        const handleOrderClick = (order) => {
            if (order.time_gone === null || order.time_gone === undefined) {
                orderStore.goneOrder(order.id - 1);
            }
        };

        return {
            orders,
            filteredOrders,
            handleOrderClick
        };
    },
    components: {
        OrderBox
    }
}
</script>

<style scoped>
.orders-container {
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
}

.order-item {
    background-color: #d7a4a4;
    width: calc(16.75% - 10px);
    margin-bottom: 10px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 1);
    cursor: pointer;
}

.order-item:hover {
    background-color: #b98080;
}
</style>