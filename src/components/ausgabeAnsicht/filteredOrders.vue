<template>
    <select v-model="selection" id="combo" @change="filterOrders">
        <option value="all">Alle Bestellungen</option>
        <option value="build">Bestellungen in Bearbeitung</option>
        <option value="ready">Fertig zur Abholung</option>
        <option v-if="hide" value="back">Bestellungen zurückholen</option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            selection: 'ready',
            hide: false
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
            if (this.selection === "back") {
                this.hide = true;
            } else {
                this.hide = false;
            }
        }
    },
    props: ['externalData']
};
</script>