<!-- 
  Author: Lucas Höttler
 -->
<script setup lang="ts">
import Modal from '@/components/bestellung/BaseModal.vue'
import Button from '@/components/bestellung/ButtonBase.vue'
</script>

<template>
  <Teleport to="body">
    <Modal container="background-color:#e7b16b">
      <template #header><h2 class="modals">STORNO</h2></template>
      <template #body>
        <div class="row">
          <div class="col"></div>
          <div class="col-3 col-radio">
            <Button @click="$emit('clear'), $emit('close')" :btn_data="btn_data[0]"
              >Aktuelle löschen</Button
            >
          </div>
        </div>
        <div class="row">
          <div class="col col-radio">
            <input type="number" class="numInput" v-model="storno_id" />
          </div>
          <div class="col-3 col-radio">
            <Button @click="$emit('storno', storno_id), $emit('close')" :btn_data="btn_data[1]"
              >STORNO</Button
            >
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col-3 col-radio">
            <Button @click="$emit('close')" :btn_data="btn_data[2]">Abbrechen</Button>
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
      emits: ['close', 'storno', 'delete'],
      btn_data: [
        {
          id: 'stbtn0',
          type: 'button',
          name: 'essen',
          value: '1',
          style: 'background-color: #c90019;color:white;'
        },
        {
          id: 'stbtn1',
          type: 'button',
          name: 'bei1',
          value: '3',
          style: 'background-color: #c90019;color:white;'
        },
        {
          id: 'stbtn2',
          type: 'button',
          name: 'bei2',
          value: '4',
          style: 'background-color: lightgray'
        }
      ],
      storno_id: undefined
    }
  }
}
</script>

<style scoped>
h2 {
  color: white;
}

.modals {
}

.col-radio {
  height: 4em;
  margin: 1%;
  padding: 0;
}

.numInput {
  width: inherit;
  height: inherit;
}
</style>
