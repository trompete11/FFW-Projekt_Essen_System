<template>
    <div class="order-box" :class="statusDetection(order)">
        <div class="order-header">
            <h2>#{{ order.id }}</h2>
            <div class="order-dates">
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <p class="order-time">In Bearbeitung seit: {{ formattedTime }}</p>
            </div>
        </div>
        <div class="order-items">
            <ul>
                <li v-for="(orderItem, index) in order.order_items" :key="index">
                    <span>{{ orderItem.count }}x {{ orderItem.item.name }}</span>
                    <div v-if="orderItem.extras && orderItem.extras.length > 0">
                        <span v-for="(extra, extraIndex) in orderItem.extras" :key="extraIndex">
                            <span v-if="extraIndex > 0"> + </span>{{ extra.name }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
        statusDetection(order) {
            if (order.time_gone === null && order.time_done === null) {
                return "In-Bearbeitung";
            } else {
                return "Undefiniert";
            }
        },
        updateFormattedTime() {
            const { time_in } = this.order;
            if (time_in) {
                const doneTime = new Date(time_in);
                const currentTime = new Date();
                const difference = currentTime.getTime() - doneTime.getTime();

                const differenceInSeconds = Math.floor(difference / 1000);
                const hours = String(Math.floor(differenceInSeconds / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((differenceInSeconds % 3600) / 60)).padStart(2, '0');
                const seconds = String(differenceInSeconds % 60).padStart(2, '0');

                this.formattedTime = `${hours}:${minutes}:${seconds}`;
            }
        }
    }
}
</script>

<style scoped>
.order-box.In-Bearbeitung {
    background-color: #fd9948;
}

.order-box.Undefiniert {
    background-color: #c01919;
}

.order-box {
    border-radius: 6px;
    padding: 5px;
    margin-bottom: 0px;
    max-width: 5000px;
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