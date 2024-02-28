<template>
  <div>
    <div>
      <h1>Ausgabe</h1>
    </div>
    <div>
      <filteredOrders @filter-change="handleFilterChange"></filteredOrders>
    </div>
    <div style="margin-top: 15px;">
      <leftView :filterSelection="selectedFilter"></leftView>
    </div>
  </div>
</template>

<script lang="ts">
import leftView from '@/components/ausgabeAnsicht/leftView.vue';
import filteredOrders from '@/components/ausgabeAnsicht/filteredOrders.vue';

export default {
  data() {
    return {
      selectedFilter: 'ready'
    };
  },
  methods: {
    handleFilterChange(selection: string) {
      this.selectedFilter = selection;
    },
  },
  components: {
    leftView,
    filteredOrders
  }
};
</script>