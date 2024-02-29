<script setup lang="ts">
import type { ButtonData } from '@/assets/bestellInterfaces'
import type { OrderItem } from '@/assets/interfaces'
import Modal from '@/components/bestellung/BaseModal.vue'
import Button from '@/components/bestellung/ButtonBase.vue'
import EssenList from '@/components/bestellung/EssenList.vue'

defineProps<{
  order: OrderItem[]
  price: number
}>()

var btns: ButtonData[] = [
  {
    id: 'stbtn0',
    type: 'button',
    style: 'background-color:lightgray'
  },
  {
    id: 'stbtn1',
    type: 'button',
    style: 'background-color:#c90019'
  },
  {
    id: 'stbtn2',
    type: 'button',
    style: 'background-color:#e6eec9'
  }
]
</script>

<template>
  <Teleport to="body">
    <Modal container="background-color:white">
      <template #header><h2 class="modals">AUSSEN TOTAL</h2></template>
      <template #body>
        <div class="row row-list">
          <div class="col"><EssenList :order="order"></EssenList></div>
        </div>

        <div class="row">
          <div class="col col-radio" style="background-color: aqua">
            <Button @click="$emit('price')" :btn_data="btns[2]">{{
              Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
            }}</Button>
          </div>
          <div class="col col-radio" style="background-color: aqua">
            <Button @click="$emit('close')" :btn_data="btns[0]">Abbrechen</Button>
          </div>
          <div class="col col-radio" style="background-color: aqua">
            <Button @click="$emit('bar'), $emit('close')" :btn_data="btns[1]">BEZAHLT</Button>
          </div>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      emits: ['close', 'storno', 'price', 'bar'],
      storno_id: undefined
    }
  }
}
</script>

<style scoped>
.col-radio {
  height: 4em;
  margin: 1%;
  padding: 0;
  color: black;
}

.row-list {
  height: 25em;
  overflow-y: scroll;
}
</style>
