<!-- 
  Author: Lucas Höttler
 -->
<script setup lang="ts">
import type { ButtonData } from '@/assets/bestellInterfaces'

var props = defineProps<{
  btn_data: ButtonData
}>()

if (
  props.btn_data.type !== 'button' &&
  props.btn_data.type !== 'checkbox' &&
  props.btn_data.type !== 'radio' &&
  props.btn_data.type !== 'addButton' &&
  props.btn_data.type !== 'site'
) {
  throw new Error(
    'Button type ' +
      props.btn_data.type +
      ' not supported. Only button, addButton, site, radio or checkbox.'
  )
}

var type = props.btn_data.type
if (props.btn_data.type === 'addButton' || props.btn_data.type === 'site') {
  type = 'button'
}

defineEmits(['click'])
</script>

<template>
  <input
    :type="type"
    :name="props.btn_data.name"
    :id="props.btn_data.id"
    class="d-none imgbgchk"
    @click="$emit('click')"
    :v-model="props.btn_data.ticked"
  />
  <label :for="props.btn_data.id" class="bestell-button-label" :style="props.btn_data.style">
    <b><slot></slot></b>
    <div class="tick_container tick"><i class="fa fa-check"></i></div>
  </label>
</template>
<script lang="ts">
export default {}
</script>
<style scoped>
.bestell-button-label {
  width: 100%;
  height: 100%;
  font-size: 17pt;
  padding-bottom: 3em;
  text-align: center;
  border-style: solid;
  border-width: 0.05em;
  border-color: black;
  -ms-user-select: None;
  -moz-user-select: None;
  -webkit-user-select: None;
  user-select: None;
  cursor: pointer;
}

.imgbgchk:checked + label > .tick_container {
  opacity: 1;
}
/*         aNIMATION */
.imgbgchk:checked + label > img {
  transform: scale(1.25);
  opacity: 0.3;
}
.tick_container {
  transition: 0.5s ease;
  opacity: 0;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
  text-align: center;
}
.tick {
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 6px 12px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
