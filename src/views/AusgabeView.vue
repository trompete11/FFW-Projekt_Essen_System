<!-- Erstellt von Fabian M -->

<template>
  <!-- Hauptcontainer für die Ausgabeansicht -->
  <div>
    <!-- Überschrift der Ausgabeansicht -->
    <div>
      <h1>Ausgabe</h1>
    </div>
    <!-- Filter und Zurückholen-Button für die Bestellungen -->
    <div>
      <span>
        <!-- Filteroptionen für die Bestellungen -->
        Ansichten: <filteredOrders :external-data="selectedFilter" @filter-change="handleFilterChange"></filteredOrders>
      </span>
      <!-- Button zum Zurückholen von Bestellungen -->
      <span style="margin-left: 25px;">
        <button class="button" @click="handleFilterBack">Bestellung(en) zurückholen</button>
      </span>
      <!-- Auslastungsanzeige -->
      <span style="margin-left: 200px;">
        Auslastung:
      </span>
      <span>
        <!-- Queue-Komponente zur Anzeige der Auslastung -->
        <queue></queue>
      </span>
    </div>
    <!-- Linke Ansicht für die Bestellübersicht -->
    <div style="margin-top: 15px;">
      <leftView :filterSelection="selectedFilter"></leftView>
    </div>
  </div>
</template>

<script lang="ts">
import filteredOrders from '@/components/ausgabeAnsicht/filteredOrders.vue';
import queue from '@/components/ausgabeAnsicht/queue.vue';
import leftView from '@/components/ausgabeAnsicht/leftView.vue';

export default {
  data() {
    return {
      // Ausgewählter Filter für die Bestellungen
      selectedFilter: "ready"
    };
  },
  methods: {
    // Methode zur Behandlung von Filteränderungen
    handleFilterChange(selection: string) {
      this.selectedFilter = selection;
    },
    // Methode zum Zurückholen von Bestellungen
    handleFilterBack() {
      this.selectedFilter = "back";
    }
  },
  components: {
    leftView,
    queue,
    filteredOrders
  }
};
</script>

<style>
/* Stildefinitionen für den Zurückholen-Button */
.button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  background-color: #c23838;
  color: white;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s;
}

/* Stildefinitionen für den Hover-Zustand des Buttons */
.button:hover {
  background-color: #45a049;
}
</style>