<script lang="ts" setup>
import type { Order } from '@/assets/interfaces';
import ToDoItem from '@/components/ToDoItem.vue';

defineProps<{
  items: Array<Order>
}>()
</script>

<template>
  <select v-model="sort">
    <option value="0">Standard</option>
    <option value="1">Alles</option>
  </select>
  <div class="todo-list">
    <ToDoItem
      v-for="item in items"
      v-bind:key="item['id']"
      :data="item"
    ></ToDoItem>
  </div>
  
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      sort: '0'
    }
  },
  methods: {
  },
  created: function () {
    
  },
  beforeUpdate: function () {
    
  }
}

function sort_0(a: any, b: any) {
  if(a.done && b.done){
    if (new Date(a.time_done) > new Date(b.time_done)) {
      return -1
    } else if (new Date(a.time_done) < new Date(b.time_done)) {
      return 1
    }
  }
  else if(!a.done && !b.done){
    if (new Date(a.time_in) < new Date(b.time_in)) {
      return -1
    } else if (new Date(a.time_in) > new Date(b.time_in)) {
      return 1
    }
  }
  else if(a.done){
    return -1
  }
  else if(b.done){
    return 1
  }
  return 0
}
</script>

<style scoped>
.todo-list {
  color: black;
  width: 100%;
  height: 32rem;
  overflow-y: scroll;
  overflow-x: visible;
  height: inherit;
}
</style>
