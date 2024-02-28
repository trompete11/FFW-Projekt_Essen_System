<template>
    <div>
        <input type="checkbox" v-model="isChecked" @change="uncheck" :value="isChecked">
        <span> Nr. #{{ props.orderId }}</span>
    </div>
</template>

<script setup lang="ts">
  import { useOrderStore } from '@/stores/orderStore';
  import { ref, reactive, watchEffect } from 'vue';
  import { type Order } from '@/assets/interfaces';

  const props = defineProps<{
    orderId: number;
    //uncheck: (order: Order, check: boolean) => void;
  }>();

  const isChecked = ref(true);
  const orderStore = useOrderStore();
  const setDone = orderStore.doneOrder;
  const filteredOrders = ref(orderStore.getFilteredOrders.done);
  const o = filteredOrders.value[props.orderId];

  watchEffect(() => {
    filteredOrders.value = orderStore.getFilteredOrders.done;
    console.log(filteredOrders.value[props.orderId]);
  })

  const uncheck = (() => {
    console.log("entered uncheck");
    console.log("entered if");
    setDone(props.orderId-1, false);
  })
</script>

<style scoped>

</style>