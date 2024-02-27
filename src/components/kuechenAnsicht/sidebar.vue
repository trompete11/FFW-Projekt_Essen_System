<template>
    <div id="sidebar-right">
        <div id="vertical-flex-container">
          <div id="queue">
            <h2>Warteschlange</h2>
            <div id="red-queue">
              <span>ROT</span>
            </div>
            <div id="yellow-queue">
              <span>GELB</span>
            </div>
            <div id="green-queue">
              <span>GRÜN</span>
            </div>
          </div>
          <div id="back">
            <h3>Zurückholen</h3>
            <div v-for="order in doneOrders" :key="order.id"> 
              <FertigeBestellung :order="order" :uncheck="uncheckOrder" />
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
  import { useOrderStore } from '@/stores/orderStore';
  import { ref, reactive, watchEffect } from 'vue';
  import { type Order } from '@/assets/interfaces';
  import FertigeBestellung from '@/components/kuechenAnsicht/fertigeBestellung.vue';

  const orderStore = useOrderStore();
  const orders = ref(orderStore.getOrders);
  const doneOrders = ref(new Set<Order>());
  const isChecked = ref(true);

  watchEffect(() => {
    orders.value.forEach((order) => {
      if(order.time_done && !order.time_gone){
        doneOrders.value.add(order);
      }
    })
  })

  function uncheckOrder(id: Order, check: boolean): void {
    console.log("ENTERED");
    if(!check){
      doneOrders.value.delete(id);
      id.time_done = null;
    }
  }

</script>

<style scoped>
#vertical-flex-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
  }
  
  #queue {
    margin-right: 30px;
  }
  
  #queue > div {
    padding: 50px;
    margin-top: 10px;
    border: 5px solid black;
    text-align: center;
    font-size: 16pt;
  }
  
  #back {
    margin-top: 100px;
    padding: 50px;
    border: 5px dashed red;
    flex: 1;
    align-items: center;
  }
</style>