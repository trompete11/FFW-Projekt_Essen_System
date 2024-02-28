<template>
    <h2>Übersicht aller Gerichtey XXX</h2>
    <div>
        <div v-for="[key, value] in sumMap" :key="key">
            <span>{{ value }}x {{ key }}</span>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/orderStore';
    import { ref, reactive, watch, watchEffect, computed } from 'vue';
    import { type Order } from '@/assets/interfaces';
    
    const orderStore = useOrderStore();
    const orders = ref(orderStore.getFilteredOrders);
    let orderCount: number = -1;
    //const sumMap = ref(new Map<string, number>);

    const sumMap = computed(() => {
        const newMap = new Map<string, number>;
            orders.value.open.forEach((order: Order) => {
            for(const items of order.order_items){
                const itemName = items.item.name;
                const currentCount = newMap.get(itemName);
                newMap.set(itemName, items.count + (currentCount ?? 0));
            }
        })
        return newMap;
    })
    
    const sumMap2 = computed(() => sumMap.value);

    watchEffect(() =>{
        console.log("entered watcheffect");
        orders.value = orderStore.getFilteredOrders;
        console.log(sumMap.value.get("Burger"));
    })

    /*watch(orders.value, (newOrder) => {
        console.log(orderCount);
        console.log(newOrder.length);
        const latestOrder = newOrder[newOrder.length - 1];
        if(latestOrder && newOrder.length > orderCount){
            orderCount++;
            if(newOrder.length == orderCount){ // work around
                orderCount--;
                return;
            }
            for (const item of latestOrder.order_items) {
                const itemName = item.item.name;
                console.log(itemName);
                sumMap.value.set(itemName, item.count + (sumMap.value.get(itemName) ?? 0));
            }
        }

        // drin lassen für spätere Problemerklärung in Doku
        /*const commonKeys = Array.from(newMap.keys()).filter(key => oldMap.has(key));
        commonKeys.forEach((key: string) => {
            if(om != undefined && nm != undefined){
                let x: number = nm.get(key);
                let y: number = om.get(key);
                sumMap.value.set(key, (x-y) ?? 0);
            }
        })*/
    //});
</script>