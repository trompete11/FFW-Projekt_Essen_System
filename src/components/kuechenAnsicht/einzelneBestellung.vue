<template>
    <div class="order" :style="{backgroundColor: backgroundColor}">
        <div class="checkbox">
            <input type="checkbox" v-model="isChecked" @change="checkOrder">
        </div>

        <div class="order-details">
            <span>Nr. #{{ orderId }}</span>
            <div v-for="item in ords" :key="ords.indexOf(item)">
                <span>{{ item.count }}x {{ item.item.name }} <span v-for="extra in item.extras" :key="extra.id"> / {{ extra.name }}</span></span>
                <span v-if="item.comment"> / Comment: {{ item.comment }}</span>
            </div>
        </div>
        <div class="timer">
            <span v-if="seconds < 10">{{ minutes}}:0{{ seconds }}</span>
            <span v-else>{{ minutes }}:{{ seconds }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Order, type OrderItem } from '@/assets/interfaces';
    import { useOrderStore } from '@/stores/orderStore';
    import { ref, defineProps, onMounted, watchEffect, watch } from 'vue';

    // define property for input of orders
    const props = defineProps<{
        ords: OrderItem[];
        orderId: number;
    }>();

    const orderStore = useOrderStore();
    const orders = ref(orderStore.getOrders);
    const setDone = orderStore.doneOrder;
    const order = orders.value[props.orderId];

    // variables for timer
    const seconds = ref(0);
    const minutes = ref(0);
    const isChecked = ref(false);
    let stopTimer: boolean = false;
    const backgroundColor = ref('#4CAF50');

    const startTimer = (() => {
        const interval = setInterval(() => {
            if(!stopTimer){
                seconds.value++;
                if(seconds.value == 60){
                    seconds.value = 0;
                    minutes.value++;
                }
            }
        }, 1000)
    })

    watch(() => minutes.value, (n, o) => {
        console.log("MINUTES: ");
        console.log(o);
        console.log(n);
        
        if(n >= 2 && n < 4){
            backgroundColor.value = '#FFC107';
        } else if(n >= 4){
            backgroundColor.value = '#F44336';
        }
    })

    const checkOrder = (() => {
        if(isChecked){
            //stopTimer = true;
            setDone(props.orderId-1, true);
        }
    })

    onMounted(() => {
        startTimer()
    })
</script>

<style scoped>
.order {
    display: flex;
    border: 1px solid white;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
}

.checkbox {
    transform: scale(2.0);
    flex: 0 0 auto;
    margin-right: 20px;
    margin-left: 20px;
}

.order-details {
    border: 1px solid green;
    flex-grow: 1; /* use available space */
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    margin-left: 5px;
    font-size: 32px;
}

.timer {
    border: 1px solid white;
    text-align: right; 
    font-size: 48px;
}
</style>