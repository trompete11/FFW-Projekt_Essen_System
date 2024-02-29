<!-- 
  Author: Lucas Höttler
 -->
<script setup lang="ts">
import type { ButtonGrid, ButtonSite } from '@/assets/bestellInterfaces'
import type { FoodItem, OrderItem } from '@/assets/interfaces'
import BestellButton from '@/components/bestellung/BestellButton.vue'
import { type Ref, ref } from 'vue'
import TextFieldBase from './TextFieldBase.vue'
import { isShorthandPropertyAssignment } from 'typescript'
const props = defineProps<{
  buttons: ButtonGrid
}>()

var site: Ref<ButtonSite | undefined> = ref()
changeSite(props.buttons.startSite)
const item: Ref<OrderItem> = ref({
  extras: [],
  count: 1,
  comment: ''
})

function addFoodItemClick(data: FoodItem) {
  if (data.extra) {
    //falls beilage bereits vorhanden wird dise entfernt
    let index = item.value.extras.findIndex((element: FoodItem) => element.id === data.id)

    if (index === -1) {
      item.value.extras.push(data)
    } else {
      item.value.extras.splice(index, 1)
    }
  } else {
    item.value.item = data
  }
}

defineEmits(['click', 'addClick'])

function calcBtnHeightStyle(): string {
  if (site.value !== undefined) return 'height: ' + 65 / site.value.buttons.length + 'vh'
  return ''
}

function changeSite(newSite: string) {
  site.value = props.buttons.sites.find((element) => newSite === element.id)
}
</script>

<template>
  <h2>Produktauswahl</h2>
  <div
    class="row row-radio"
    :style="calcBtnHeightStyle()"
    v-for="(row, index) in site?.buttons"
    v-bind:key="index"
  >
    <div class="col col-radio" v-for="btn in row" v-bind:key="btn.btnData.id">
      <TextFieldBase
        v-if="btn.btnData.type === 'text'"
        :btn_data="btn"
        @change="
          (data: string) => {
            item.comment = data
          }
        "
      />
      <BestellButton
        v-else
        :btn="btn"
        @click="(item) => addFoodItemClick(item)"
        @addClick="$emit('addClick', item)"
        @siteChange="
          (newSite) => {
            changeSite(newSite)
          }
        "
      />
    </div>
  </div>
</template>

<style scoped>
.row-radio {
  display: flex;
  align-items: center;
  margin-top: 1%;
}

.col-radio {
  height: 100%;
  margin: 1%;
  padding: 0;
  z-index: 10;
}

h2 {
  font-size: x-large;
}
</style>
