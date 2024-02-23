<template>
    <div class="order">
        <div class="checkbox">
            <input type="checkbox" v-model="isChecked" @change="checkOrder">
        </div>

        <div class="order-details">
            <span>Nr. #{{ order_id }}</span>
            <div v-for="item in ords" :key="item.id">
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
    import { ref, defineProps, onMounted } from 'vue';

    // define property for input of orders
    const props = defineProps<{
        ords: OrderItem[];
        order_id: number;
        done: Order; // for setting time_done
    }>();

    // variables for timer
    const seconds = ref(0)
    const minutes = ref(0)
    const isChecked = ref(false);
    let stopTimer: boolean = false;

    const startTimer = (() => {
        const interval = setInterval(() => {
            if(!stopTimer){
                seconds.value++
                if(seconds.value == 60){
                    seconds.value = 0
                    minutes.value++
                }
            }
        }, 1000)
    })

    const checkOrder = (() => {
        if(isChecked){
            stopTimer = true;
            props.done.time_done = new Date().toLocaleTimeString();
            console.log(props.done.time_done);
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
    /* add background color */
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
    color: red;
}
</style>