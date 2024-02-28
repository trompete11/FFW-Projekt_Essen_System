<template>
    <div class="traffic-light">
        <div class="light red" :class="{ active: activeLight === 'red' }"></div>
        <div class="light yellow" :class="{ active: activeLight === 'yellow' }"></div>
        <div class="light green" :class="{ active: activeLight === 'green' }"></div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import config from '@/components/ausgabeAnsicht/configAusgabeAnsicht.js';

export default {
    setup() {
        const orderStore = useOrderStore();
        const activeLight = ref('green');

        watch(() => orderStore.getOrders, (newValue) => {
            const orderCount = newValue.length;
            if (orderCount === config.full) {
                activeLight.value = 'red';
            } else if (orderCount === config.medium) {
                activeLight.value = 'yellow';
            } else {
                activeLight.value = 'green';
            }
        });

        return { activeLight };
    }
}
</script>

<style scoped>
.traffic-light {
    width: 140px;
    height: 40px;
    background-color: #333;
    border-radius: 6px;
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
}

.light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    transition: opacity 0.3s ease;
}

.red.active {
    background-color: red;
}

.yellow.active {
    background-color: yellow;
}

.green.active {
    background-color: green;
}

.light:not(.active) {
    opacity: 0.5;
}
</style>