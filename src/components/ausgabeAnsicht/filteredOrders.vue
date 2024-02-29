<!-- Erstellt von Fabian M -->

<template>
    <!-- Dropdown-Menü zur Auswahl von Bestellfiltern -->
    <select v-model="selection" id="combo" @change="filterOrders">
        <option value="all">Alle Bestellungen</option>
        <option value="build">Bestellungen in Bearbeitung</option>
        <option value="ready">Fertig zur Abholung</option>
        <!-- Option zum Zurückholen von Bestellungen wird nur angezeigt, wenn hide true ist -->
        <option v-if="hide" value="back">Bestellungen zurückholen</option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            // Vorausgewählter Wert für die Dropdown-Auswahl
            selection: 'ready',
            // Boolean-Wert zum Anzeigen/Verstecken der Option zum Zurückholen von Bestellungen
            hide: false
        };
    },
    methods: {
        // Methode zur Filterung von Bestellungen und Auslösen des Ereignisses
        filterOrders() {
            this.$emit('filter-change', this.selection);
        }
    },
    // Überwachung der externen Daten für Änderungen
    watch: {
        externalData(newValue) {
            // Aktualisierung der Auswahl entsprechend der externen Daten
            this.selection = newValue;
            // Überprüfung, ob die Option zum Zurückholen von Bestellungen angezeigt werden soll
            if (this.selection === "back") {
                this.hide = true;
            } else {
                this.hide = false;
            }
        }
    },
    // Definition der externen Daten als Eigenschaft
    props: ['externalData']
};
</script>
