<template>
    <div class="order-box">
        <div class="order-header">
            <h2>#{{ order.id }}</h2>
            <div class="order-dates">
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <p class="order-time">Abholbereit seit: {{ formattedTime }}</p>
            </div>
        </div>
        <div class="order-items">
            <ausgabeOrder :order-items="order.order_items" />
        </div>
    </div>
</template>

<script>
import ausgabeOrder from '@/components/ausgabeAnsicht/ausgabeOrder.vue';

export default {
    props: {
        order: Object
    },
    data() {
        return {
            formattedTime: ''
        };
    },
    mounted() {
        this.updateFormattedTime();
        setInterval(this.updateFormattedTime, 1000);
    },
    methods: {
        formatTime(timeString) {
            const time = new Date(timeString);
            return time.toLocaleString();
        },
        updateFormattedTime() {
            const { time_done } = this.order;
            if (time_done) {
                console.log(time_done);
                const Time = new Date(time_done);
                const currentTime = new Date();
                const difference = currentTime.getTime() - Time.getTime();

                const differenceInSeconds = Math.floor(difference / 1000);
                const hours = String(Math.floor(differenceInSeconds / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((differenceInSeconds % 3600) / 60)).padStart(2, '0');
                const seconds = String(differenceInSeconds % 60).padStart(2, '0');

                this.formattedTime = `${hours}:${minutes}:${seconds}`;
            }
        }
    },
    components: {
        ausgabeOrder
    }
}
</script>

<style scoped>
.order-box {
    padding: 5px;
    margin-bottom: 10px;
    max-width: 500px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-header h2 {
    margin: 0;
    font-size: 30px;
}

.order-dates {
    font-size: 12px;
}

.order-time {
    margin: 0;
}

.order-items ul {
    padding-left: 15px;
}

.order-items li {
    margin-bottom: 2px;
    font-size: 14px;
}
</style>