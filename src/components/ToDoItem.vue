<script setup lang="ts">
import { type Order } from '@/assets/interfaces';
defineProps<{
  data: Order
}>()
</script>

<template>
  <div
    class="row align-items-center todo-item"
    :class="{
      'todo-normal':
        (timeCount(data.time_in).valueOf() < 420000) || data.time_done !== null,
      'todo-red': (timeCount(data.time_in).valueOf() > 420000) && data.time_done !== null,
      'todo-new': timeCount(data.time_in).valueOf() < 60000 && data.time_done !== null
    }"
  >
    <div class="col-1 align-items-center checker">
      <input type="checkbox" name="test" checked @click="$emit('click', data.id)" v-if="data.time_done !== null" />
      <input type="checkbox" name="test" v-else @click="$emit('click', data.id)" />
    </div>
    <div class="col item_in" @click="$emit('click', data.id)">
      <div class="nummer">Nr: {{ numDisplay(data.id) }}</div>
      <div v-for="essen in data.order_items" :key="essen.id">
        {{ essen.count }}x {{ essen.item.name }} /
        <span v-for="extra in essen.extras" :key="extra.id"
          >{{ extra.name }}, </span
        ><br />
        <span v-if="essen.comment !== ''">{{ essen.comment }}</span>
      </div>
    </div>
    <div class="col-3 time" v-if="data.time_done != null">
      <i>fertig: {{ timeFormat(data.time_done) }}</i
      ><br />{{ timeFormat(timeCount(data.time_in, data.time_done)) }}
    </div>
    <div class="col-3 time" v-else>{{ timeFormat(time) }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      time: timeCount(this.data.time_in, this.data.time_done),
      emits: ['click']
    }
  },
  methods: {
    updateTime() {
      let th = this
      setInterval(function () {
        th.time = timeCount(th.data.time_in)
      }, 1000)
    }
  },
  mounted: function () {
    //this.updateTime()
  }
}

function timeFormat(date: Date) {
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  let hs = '' + h
  let ms = '' + m
  let ss = '' + s
  if (h < 10) hs = '0' + h
  if (m < 10) ms = '0' + m
  if (s < 10) ss = '0' + s
  let out
  if (h !== 0) {
    out = hs + ':' + ms + ':' + ss
  } else {
    out = ms + ':' + ss
  }
  return out
}

function timeCount(a:Date, b:Date | null = null):Date {
  if (b === null) {
    b = new Date()
  }
  return new Date(Math.abs(b.valueOf() - a.valueOf()))
}

function numDisplay(num: number) {
  if (num < 10) {
    return '00' + num
  } else if (num < 100) {
    return '0' + num
  } else {
    return num
  }
}
</script>

<style scoped>
.nummer {
  font-size: x-large;
}
.item_in {
  font-size: larger;
  font-weight: bold;
}
.todo-item {
  padding: 0.5em 1em;
  margin: 1rem 0;
  border-radius: 1em;
  -ms-user-select: None;
  -moz-user-select: None;
  -webkit-user-select: None;
  user-select: None;
}

.todo-normal {
  background: #efeeea;
}

.todo-new {
  background: #e1f1f1;
}

.todo-red {
  background: #df8e70;
}

.todo-green {
  background: #c2d093;
}

.col-1 {
  padding: 0;
}

.col {
  padding: 0, 1em;
}

.time {
  text-align: right;
}

div.checker,
div.checker input,
div.checker span {
  width: 2.1em;
  height: 2.1em;
}

div.checker,
div.radio,
div.uploader {
  position: relative;
}

div.button,
div.button *,
div.checker,
div.checker *,
div.radio,
div.radio *,
div.selector,
div.selector *,
div.uploader,
div.uploader * {
  margin: 0;
  padding: 0;
}

div.button,
div.checker,
div.radio,
div.selector,
div.uploader {
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
  vertical-align: middle;
}
</style>
