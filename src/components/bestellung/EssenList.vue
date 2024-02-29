<script lang="ts" setup>
import type { OrderItem } from '@/assets/interfaces'
import { onBeforeUpdate } from 'vue'

var props = defineProps<{
  order: OrderItem[] | []
}>()

onBeforeUpdate(() => {
  console.log('essenlist')
})
</script>

<template>
  <div class="row" v-for="(item, index) in props.order" v-bind:key="index">
    <div class="col">
      {{ item.count }}x {{ item.item.name }} /
      <span v-for="extra in item.extras" v-bind:key="extra.id">{{ extra.name }}, </span>
      <span></span><br />
      <span v-if="item.comment !== ''">{{ item.comment }}</span>
    </div>
    <div class="col-2 price">
      {{
        Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
          item.price_sum * item.count
        )
      }}
    </div>
  </div>
</template>

<style scoped>
.price {
  text-align: right;
}
</style>
