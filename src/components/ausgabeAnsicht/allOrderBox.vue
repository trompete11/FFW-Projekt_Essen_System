<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für eine Bestellung -->
    <div class="order-box" :class="statusDetection(order)">
        <!-- Bestellungs-Header -->
        <div class="order-header">
            <!-- Bestellungsnummer -->
            <h2>#{{ order.id }}</h2>
            <!-- Zeit- und Statusinformationen -->
            <div class="order-dates">
                <!-- Anzeige der Bestellzeit -->
                <p class="order-time">Bestellzeit: {{ formatTime(order.time_in) }}</p>
                <!-- Anzeige des Bestellstatus -->
                <p class="order-time">Status: {{ statusDetection(order) }}</p>
            </div>
        </div>
        <!-- Liste der bestellten Artikel -->
        <div class="order-items">
            <!-- Einbinden der Komponente für die Ausgabe der Bestellung -->
            <ausgabeOrder :order-items="order.order_items" />
        </div>
    </div>
</template>

<script>
import ausgabeOrder from '@/components/ausgabeAnsicht/ausgabeOrder.vue';

export default {
    props: {
        // Eigenschaft zur Übernahme der Bestellungsdaten
        order: Object
    },
    methods: {
        // Funktion zur Formatierung der Zeit
        formatTime(timeString) {
            const time = new Date(timeString);
            return time.toLocaleString();
        },
        // Funktion zur Ermittlung des Bestellstatus
        statusDetection(order) {
            if (order.time_gone !== null && order.time_done !== null) {
                return "Ausgeliefert";
            } else if (order.time_gone === null && order.time_done !== null) {
                return "Abholbereit";
            } else if (order.time_gone === null && order.time_done === null) {
                return "In-Bearbeitung";
            } else if (order.time_gone !== null && order.time_done === null) {
                return "Nicht-in-Bearbeitung";
            } else {
                return "Undefiniert";
            }
        }
    },
    components: {
        // Einbinden der ausgabeOrder-Komponente
        ausgabeOrder
    }
}
</script>

<style scoped>
/* Stildefinitionen für die Bestellboxen */
.order-box.Ausgeliefert {
    background-color: #afd7a4;
}

.order-box.Abholbereit {
    background-color: #FFE58A;
}

.order-box.In-Bearbeitung {
    background-color: #fd9948;
}

.order-box.Nicht-in-Bearbeitung {
    background-color: #ff6060;
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

/* Stildefinitionen für den Bestellungs-Header */
.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Stildefinitionen für die Bestellungsnummer */
.order-header h2 {
    margin: 0;
    font-size: 30px;
}

/* Stildefinitionen für die Zeit- und Statusinformationen */
.order-dates {
    font-size: 12px;
}

/* Stildefinitionen für die Zeitangaben */
.order-time {
    margin: 0;
}

/* Stildefinitionen für die Liste der bestellten Artikel */
.order-items ul {
    padding-left: 15px;
}

/* Stildefinitionen für die einzelnen Artikel in der Liste */
.order-items li {
    margin-bottom: 2px;
    font-size: 14px;
}
</style>