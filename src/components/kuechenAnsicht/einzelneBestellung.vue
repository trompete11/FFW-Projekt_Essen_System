<template>
  <div class="order" :style="{ backgroundColor: backgroundColor }">
    <div class="checkbox">
      <input v-if="!orders[orderId-1].time_done" type="checkbox" v-model="isChecked" @change="setDone(props.orderId-1, isChecked)" />
    </div>
    <div class="order-details">
      <span>Nr. #{{ orderId }}</span>
      <div v-for="item in ords" :key="ords.indexOf(item)">
        <span>{{ item.count }}x {{ item.item.name }}
          <span v-for="extra in item.extras" :key="extra.id"> / {{ extra.name }}</span></span>
        <span v-if="item.comment"> / Comment: {{ item.comment }}</span>
      </div>
    </div>
    <div class="timer">
      <span v-if="seconds < 10">{{ minutes }}:0{{ seconds }}</span>
      <span v-else>{{ minutes }}:{{ seconds }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type OrderItem } from '@/assets/interfaces'
import { useOrderStore } from '@/stores/orderStore'
import { ref, onMounted, watch } from 'vue'

// define property for input of orders
const props = defineProps<{
  ords: OrderItem[]
  orderId: number
}>()
const orderStore = useOrderStore()
const orders = ref(orderStore.getOrders)
const setDone = orderStore.doneOrder

// variables for timer
const seconds = ref(new Date().getSeconds() - new Date(orders.value[props.orderId-1].time_in).getSeconds())
const minutes = ref(new Date().getMinutes() - new Date(orders.value[props.orderId-1].time_in).getMinutes())
const isChecked = ref(false)
let stopTimer: boolean = false
const backgroundColor = ref('#4CAF50')

const startTimer = () => {
  const interval = setInterval(() => {
    if (!orders.value[props.orderId-1].time_done) {
      seconds.value++
      if (seconds.value == 60) {
        seconds.value = 0
        minutes.value++
      }
    }
  }, 1000)
}

watch(() => minutes.value,(n, o) => {
    if (n >= 2 && n < 4) {
      backgroundColor.value = '#FFC107'
    } else if (n >= 4) {
      backgroundColor.value = '#F44336'
    }
  }
)

const checkOrder = () => {
  if (isChecked) {
    //stopTimer = true;
    setDone(props.orderId - 1)
  }
}

onMounted(() => {
  startTimer()
})
</script>

<style scoped>
.order {
  display: flex;
  border-radius: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
}

.checkbox {
  transform: scale(2);
  flex: 0 0 auto;
  margin-right: 20px;
  margin-left: 20px;
}

.order-details {
  flex-grow: 1; /* use available space */
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 32px;
}

.timer {
  text-align: right;
  font-size: 48px;
}
</style>
