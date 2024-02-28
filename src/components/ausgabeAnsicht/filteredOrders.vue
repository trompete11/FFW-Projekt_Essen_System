<template>
    <select v-model="selection" id="combo" @change="filterOrders">
        <option value="all">Alle Bestellungen</option>
        <option value="build">Bestellungen in Bearbeitung</option>
        <option value="ready">Fertig zur Abholung</option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            selection: 'ready'
        };
    },
    methods: {
        filterOrders() {
            this.$emit('filter-change', this.selection);
        }
    },
    watch: {
        externalData(newValue) {
            this.selection = newValue;
        }
    },
    props: ['externalData']
};
</script>