<script setup lang="ts">
  import type { BestellButtonData } from '@/assets/bestellInterfaces';
  import type { FoodItem } from '@/assets/interfaces';
  import Button from '@/components/bestellung/ButtonBase.vue';
  var props = defineProps<{
    btn: BestellButtonData
  }>();

  defineEmits(['click', 'siteChange', 'addClick']);
</script>

<template>
  <Button v-if="props.btn.btnData.type === 'site'" :btn_data="props.btn.btnData" @click="$emit('siteChange', props.btn.data)">
    {{ props.btn.data }}
  </Button>
  <Button v-if="props.btn.btnData.type === 'addButton'" :btn_data="props.btn.btnData" @click="$emit('addClick')">
    {{ props.btn.data }}
  </Button>
  <Button v-else-if="isFoodItem(props.btn.data)" :btn_data="props.btn.btnData" @click="$emit('click', props.btn.data)">
    {{ props.btn.data.name }} <span style="font-size: medium"><br />
      {{ props.btn.data.description }}</span>
  </Button>
</template>

<script lang="ts">
function isFoodItem(item: FoodItem | string): item is FoodItem{
  return (item as FoodItem).id !== undefined;
}
</script>

<style scoped>
</style>
