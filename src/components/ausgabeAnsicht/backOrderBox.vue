<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für die Bestellübersicht -->
    <div class="order-box">
        <!-- Kopfzeile der Bestellung -->
        <div class="order-header">
            <!-- Anzeige der Bestellnummer -->
            <h2>#{{ order.id }}</h2>
            <!-- Anzeige von Bestellzeiten und Status -->
            <div class="order-dates">
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <p class="order-time">Auslieferungsdatum: {{ formatTime(order.time_gone) }}</p>
                <p class="order-time">Status: {{ "Ausgeliefert" }}</p>
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
    methods: {
        // Methode zur Formatierung von Zeitangaben
        formatTime(timeString) {
            const time = new Date(timeString);
            return time.toLocaleString();
        }
    },
    components: {
        ausgabeOrder
    }
}
</script>

<style scoped>
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