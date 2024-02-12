<template>
    <div>
        <h2>Offene Bestellungen</h2>
    </div>
    <div class="order-container">
        <EinzelBestellung />
        <EinzelBestellung />
        <EinzelBestellung />
        <EinzelBestellung />
        <EinzelBestellung />
        <EinzelBestellung />
    </div>
</template>

<script setup lang="ts">
    import EinzelBestellung from '@/components/kuechenAnsicht/einzelneBestellung.vue';
</script>

<style scoped>
    .order-container {
        max-height: 800px;
        overflow-y: auto;
        border: 1px solid blue;
    }
</style>
