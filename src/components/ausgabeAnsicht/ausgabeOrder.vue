<!-- Erstellt von Fabian M -->

<template>
    <!-- Schleife durch alle Bestellpositionen -->
    <ul>
        <li v-for="(orderItem, index) in orderItems" :key="index">
            <!-- Anzeige der Anzahl und des Namens der Bestellposition -->
            <span>{{ orderItem.count }}x {{ orderItem.item.name }}</span>
            <!-- Überprüfung auf zusätzliche Extras -->
            <div v-if="orderItem.extras && orderItem.extras.length > 0">
                <!-- Schleife durch alle Extras der aktuellen Bestellposition -->
                <span v-for="(extra, extraIndex) in orderItem.extras" :key="extraIndex">
                    <!-- Anzeige von Extras, durch Trennung "+" dargestellt -->
                    <span v-if="extraIndex > 0"> + </span>{{ extra.name }}
                </span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    // Komponenten-Eigenschaft zum Empfangen von Bestellpositionen
    props: {
        orderItems: {
            type: Array,
            required: true
        }
    }
};
</script>