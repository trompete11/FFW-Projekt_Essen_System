<!-- 
  Author: Lucas Höttler
 -->
<script setup lang="ts">
import type { ButtonData } from '@/assets/bestellInterfaces'
import Modal from '@/components/bestellung/BaseModal.vue'
import Button from '@/components/bestellung/ButtonBase.vue'

defineProps<{
  id: number
}>()

defineEmits(["close"])
var closeBtn: ButtonData =
  {
    id: 'stbtn0',
    type: 'button',
    style: 'background-color:lightgray'
  }

</script>

<template>
  <Teleport to="body">
    <Modal container="background-color:white">
      <template #header><h2 class="modals">ID</h2></template>
      <template #body>
        <div class="row">
          <div class="col"><h1>Id: {{ id }}</h1></div>
        </div>

        <div class="row">
          <div class="col col-radio">
          </div>
          <div class="col col-radio">
            <Button @click="$emit('close')" :btn_data="closeBtn">Schließen</Button>
          </div>
          <div class="col col-radio">
          </div>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<script lang="ts">

</script>

<style scoped>
.col-radio {
  height: 4em;
  margin: 1%;
  padding: 0;
  color: black;
}
</style>
