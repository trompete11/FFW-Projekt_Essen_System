<template>
  <div>
    <h1>Küche</h1>
    <div id="flex-container">
      <div id="single-orders">
        <OffeneBestellungen />
      </div>
      <div id="sum-dishes"> <!-- Summe aller Gerichte ohne Beilagen -->
        <SummeGerichte />
      </div>
      <div id="sidebar-right">
        <h2>SIDEBAR</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import OffeneBestellungen from '@/components/kuechenAnsicht/offeneBestellungen.vue';
  import SummeGerichte from '@/components/kuechenAnsicht/summeGerichte.vue';
</script>

<style scoped>
#flex-container{
  display: flex;
}

#single-orders{
  flex: 1;
}

#sum-dishes{
  flex: 1;
  margin-left: 10px;
}

#sidebar-right {
  flex: 0 0 auto;
}
</style>
