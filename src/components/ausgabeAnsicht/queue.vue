<!-- Erstellt von Fabian M -->

<template>
    <!-- Container für die Ampel -->
    <div class="traffic-light">
        <!-- Rote Ampel mit dynamischer Klasse -->
        <div class="light red" :class="{ active: activeLight === 'red' }"></div>
        <!-- Gelbe Ampel mit dynamischer Klasse -->
        <div class="light yellow" :class="{ active: activeLight === 'yellow' }"></div>
        <!-- Grüne Ampel mit dynamischer Klasse -->
        <div class="light green" :class="{ active: activeLight === 'green' }"></div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import config from '@/components/ausgabeAnsicht/configAusgabeAnsicht.js';

export default {
    setup() {
        // Verwendung des Bestellenspeichers aus einer Store-Instanz
        const orderStore = useOrderStore();
        // Referenz zur aktiven Ampel
        const activeLight = ref('green');

        // Beobachter für Änderungen der Bestellungen
        watch(() => orderStore.getOrders, (newValue) => {
            const orderCount = newValue.length;
            // Anpassen der aktiven Ampel basierend auf der Anzahl der Bestellungen
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
/* Stildefinitionen für den Container der Ampel */
.traffic-light {
    width: 140px;
    height: 40px;
    background-color: #333;
    border-radius: 6px;
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
}

/* Stildefinitionen für die einzelnen Lichter */
.light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    transition: opacity 0.3s ease;
}

/* Stildefinitionen für das rote Licht */
.red.active {
    background-color: red;
}

/* Stildefinitionen für das gelbe Licht */
.yellow.active {
    background-color: yellow;
}

/* Stildefinitionen für das grüne Licht */
.green.active {
    background-color: green;
}

/* Stildefinitionen für die inaktiven Lichter */
.light:not(.active) {
    opacity: 0.5;
}
</style>