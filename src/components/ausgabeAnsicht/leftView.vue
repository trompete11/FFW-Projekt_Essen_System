<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für die Bestellübersicht -->
    <div class="orders-container">
        <!-- Schleife durch die gefilterten Bestellungen -->
        <li v-for="order in filteredOrders" :key="order.id" class="order-item">
            <!-- Anzeige der Bestellung basierend auf dem ausgewählten Filter -->
            <template v-if="filterSelection === 'ready'">
                <readyOrderBox :order="order" @click="handleOrderClick(order)" />
            </template>
            <template v-else-if="filterSelection === 'build'">
                <buildOrderBox :order="order" />
            </template>
            <template v-else-if="filterSelection === 'back'">
                <backOrderBox :order="order" @click="handleOrderClickBack(order)" />
            </template>
            <template v-else>
                <allOrderBox :order="order" />
            </template>
        </li>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import config from '@/components/ausgabeAnsicht/configAusgabeAnsicht.js';
import readyOrderBox from '@/components/ausgabeAnsicht/readyOrderBox.vue';
import buildOrderBox from '@/components/ausgabeAnsicht/buildOrderBox.vue';
import allOrderBox from '@/components/ausgabeAnsicht/allOrderBox.vue';
import backOrderBox from '@/components/ausgabeAnsicht/backOrderBox.vue';

export default {
    data() {
        return {
            // Importierte Konfigurationswerte für Bestelltypen
            shortOrderT: config.shortOrderT,
            mediumOrderT: config.mediumOrderT,
            longOrderT: config.longOrderT
        }
    },
    // Definition des Prop 'filterSelection'
    props: ['filterSelection'],
    setup(props) {
        // Verwendung des Bestellenspeichers aus einer Store-Instanz
        const orderStore = useOrderStore();
        // Zugriff auf die Liste der Bestellungen aus dem Store
        const orders = orderStore.orders;

        // Berechnete Eigenschaft für die gefilterten Bestellungen basierend auf dem ausgewählten Filter
        const filteredOrders = computed(() => {
            if (props.filterSelection === 'ready') {
                return orderStore.getFilteredOrders.oDone;
            } else if (props.filterSelection === 'build') {
                return orderStore.getFilteredOrders.open;
            } else if (props.filterSelection === 'back') {
                return orderStore.getFilteredOrders.gone;
            } else {
                return orders;
            }
        });

        // Methode zum Behandeln von Klicks auf Bestellungen
        const handleOrderClick = (order) => {
            if (order.time_gone === null) {
                orderStore.goneOrder(order.id - 1);
            }
        };

        // Methode zum Behandeln von Klicks auf Bestellungen zum Zurückholen
        const handleOrderClickBack = (order) => {
            orderStore.goneOrder(order.id - 1, false);
        }

        return {
            // Rückgabe der erforderlichen Daten und Methoden
            orders,
            filteredOrders,
            handleOrderClick,
            handleOrderClickBack
        };
    },
    // Registrierung der Bestellungs-Komponenten
    components: {
        readyOrderBox,
        buildOrderBox,
        allOrderBox,
        backOrderBox
    }
}
</script>

<style scoped>
/* Stildefinitionen für den Container der Bestellungen */
.orders-container {
    border-radius: 6px;
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
}

/* Stildefinitionen für einzelne Bestellungsitems */
.order-item {
    border-radius: 6px;
    background-color: #afd7a4;
    width: calc(16.75% - 10px);
    margin-bottom: 10px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 1);
    cursor: pointer;
}

/* Stildefinitionen für das Hovern über Bestellungsitems */
.order-item:hover {
    background-color: #b98080;
}
</style>