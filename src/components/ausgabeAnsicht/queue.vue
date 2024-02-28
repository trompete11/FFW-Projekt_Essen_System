<template>
    <div class="traffic-light">
        <div class="light red" :class="{ active: activeLight === 'red' }"></div>
        <div class="light yellow" :class="{ active: activeLight === 'yellow' }"></div>
        <div class="light green" :class="{ active: activeLight === 'green' }"></div>
    </div>
</template>

<!-- <script>
import { useOrderStore } from '@/stores/orderStore';
import config from '@/components/ausgabeAnsicht/configAusgabeAnsicht.js';

export default {
    data() {
        return {
            empty: config.empty,
            medium: config.medium,
            full: config.full
        }
    },
    /* setup() {
        const orderStore = useOrderStore();
        const orders = orderStore.getOrders;
        const orderCount = orders.length;
    }, */
    props: ['activeLight'],
    methods: {
        switchLight() {
            if (config.empty === length(orders)) {
                return
            } else if (config.medium === ) {
                return
            } else if (config.full === ) {
                return
            }
        }
    }
}
</script>

<style scoped>
.traffic-light {
    width: 100px;
    height: 300px;
    background-color: #333;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.light {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.red {
    background-color: red;
}

.yellow {
    background-color: yellow;
}

.green {
    background-color: green;
}

.active {
    border: 5px solid #fff;
}
</style> -->