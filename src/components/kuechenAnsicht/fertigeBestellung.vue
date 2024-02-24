<template>
    <div>
        <input type="checkbox" v-model="isChecked" @change="uncheck(order, isChecked)" value="isChecked">
        <span> Nr. #{{ order.id }}</span>
    </div>
</template>

<script setup lang="ts">
  import { useOrderStore } from '@/stores/orderStore';
  import { ref, reactive, watchEffect } from 'vue';
  import { type Order } from '@/assets/interfaces';
    
  //const props = defineProps(['order', 'uncheck']);

  const props = defineProps<{
    order: Order;
    uncheck: (order: Order, check: boolean) => void;
  }>();

  const isChecked = ref(true);

  /*const uncheckOrder = ((id: Order) => {
    if(!isChecked){
      props.doneOrders.values.delete(id);
      id.time_done = null;
    }
  })*/

</script>

<style scoped>

</style>