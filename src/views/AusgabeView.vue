<template>
  <div>
    <div>
      <h1>Ausgabe</h1>
    </div>
    <div>
      <span>
        Ansichten: <filteredOrders :external-data="selectedFilter" @filter-change="handleFilterChange"></filteredOrders>
      </span>
      <span style="margin-left: 25px;">
        <button class="button" @click="handleFilterBack">Bestellung(en) zurückholen</button>
      </span>
      <span style="margin-left: 100px;">
        Ansicht
      </span>
      <span style="margin-left: 25px;">
        <!-- <queue></queue> -->
      </span>
    </div>
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
      selectedFilter: "ready"
    };
  },
  methods: {
    handleFilterChange(selection: string) {
      this.selectedFilter = selection;
    },
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

.button:hover {
  background-color: #45a049;
}
</style>
