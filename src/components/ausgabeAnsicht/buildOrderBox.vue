<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für die Bestellübersicht mit dynamischer Klasse -->
    <div class="order-box" :class="statusDetection(order)">
        <!-- Kopfzeile der Bestellung -->
        <div class="order-header">
            <!-- Anzeige der Bestellnummer -->
            <h2>#{{ order.id }}</h2>
            <!-- Anzeige von Bestellzeiten und Bearbeitungsdauer -->
            <div class="order-dates">
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <p class="order-time">In Bearbeitung seit: {{ formattedTime }}</p>
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
    // Beim Laden der Komponente die formatierte Zeit aktualisieren und fortlaufend aktualisieren
    mounted() {
        this.updateFormattedTime();
        setInterval(this.updateFormattedTime, 1000);
    },
    methods: {
        // Methode zur Formatierung von Zeitangaben
        formatTime(timeString) {
            const time = new Date(timeString);
            return time.toLocaleString();
        },
        // Methode zur Statuserkennung und Zuweisung der entsprechenden CSS-Klasse
        statusDetection(order) {
            if (order.time_gone === null && order.time_done === null) {
                return "In-Bearbeitung";
            } else {
                return "Undefiniert";
            }
        },
        // Methode zur Aktualisierung der formatierten Zeit
        updateFormattedTime() {
            const { time_in } = this.order;
            if (time_in) {
                const Time = new Date(time_in);
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
/* Stildefinitionen für die verschiedenen Status */
.order-box.In-Bearbeitung {
    background-color: #fd9948;
}

.order-box.Undefiniert {
    background-color: #ff6060;
}

/* Allgemeine Stildefinitionen */
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