<script setup lang="ts">
  import type { BestellButtonData } from '@/assets/bestellInterfaces';
import { ref } from 'vue';

  const props = defineProps<{
    btn_data: BestellButtonData
  }>();
  
  var comment = ref("");

  if(props.btn_data.btnData.type !== "text"){
    throw new Error("Button type " + props.btn_data.btnData.type + "not supported. Only text.");
  }

  defineEmits(["change"])
</script>

<template>
  <input
    :type="props.btn_data.btnData.type"
    :name="props.btn_data.btnData.name"
    :id="props.btn_data.btnData.id"
    :style="props.btn_data.btnData.style"
    :placeholder="props.btn_data.data"
    class="d-none"
  />
  <div class="input-group text_grp">
      <input
        :type="btn_data.btnData.type"
        :name="btn_data.btnData.name"
        class="text"
        v-model="comment"
        @change="$emit('change', comment)"
      />
      <div class="input-group-append inGrp">
        <button class="btn btn-outline-secondary" type="button" @click="comment = '', $emit('change', comment)">
          Clear
        </button>
      </div>
    </div>
</template>
<style scoped>
  .text_grp {
    width: 100%;
    height: inherit;
  }
  .inGrp{
    width: 30%;

  }
  .tex  t {
    width: 70%;
  }
  .btn{
    height: 100%;
  }
</style>
