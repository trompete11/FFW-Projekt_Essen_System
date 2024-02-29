<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für die Bestellübersicht -->
    <div class="order-box">
        <!-- Kopfzeile der Bestellung -->
        <div class="order-header">
            <!-- Anzeige der Bestellnummer -->
            <h2>#{{ order.id }}</h2>
            <!-- Anzeige von Bestellzeiten -->
            <div class="order-dates">
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <p class="order-time">Abholbereit seit: {{ formattedTime }}</p>
            </div>
        </div>
        <!-- Anzeige der Bestellpositionen -->
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
        // Aktualisierung der formatierten Zeit bei Komponentenmontage und fortlaufend
        this.updateFormattedTime();
        setInterval(this.updateFormattedTime, 1000);
    },
    methods: {
        // Methode zur Formatierung der Zeit
        formatTime(timeString) {
            const time = new Date(timeString);
            return time.toLocaleString();
        },
        // Methode zur Aktualisierung der formatierten Zeit
        updateFormattedTime() {
            const { time_done } = this.order;
            if (time_done) {
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
/* Stildefinitionen für die Bestellbox */
.order-box {
    padding: 5px;
    margin-bottom: 10px;
    max-width: 500px;
}

/* Stildefinitionen für die Kopfzeile der Bestellung */
.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Stildefinitionen für die Bestellnummer */
.order-header h2 {
    margin: 0;
    font-size: 30px;
}

/* Stildefinitionen für die Bestellzeiten */
.order-dates {
    font-size: 12px;
}

/* Stildefinitionen für die Bestellpositionen */
.order-items ul {
    padding-left: 15px;
}

.order-items li {
    margin-bottom: 2px;
    font-size: 14px;
}
</style>