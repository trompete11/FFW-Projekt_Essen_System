<template>
  <div>
    <h1>Küche</h1>
    <div id="flex-container">
      <div id="single-orders">
        <OffeneBestellungen />
      </div>
      <div id="second"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import OffeneBestellungen from '@/components/kuechenAnsicht/offeneBestellungen.vue';
</script>

<style scoped>
#flex-container{
  display: flex
}

#single-orders{
  flex: 1
}

#second{
  flex: 1
}
</style>
