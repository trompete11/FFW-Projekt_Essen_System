<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Heading from '@/components/BaseHeading.vue'
</script>

<template>
  <div class="">
    <header class="row heading">
      <Heading>
        <template #logo>
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
        </template>
        <template #heading>JRK Verpflegungssystem</template>
        <template #subheading>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/bestellung">Bestellung</RouterLink>
          <RouterLink to="/kueche">Küche</RouterLink>
          <RouterLink to="/ausgabe">Ausgabe</RouterLink>
        </template>
        <template #uhr>{{ uhrzeit }}</template>
      </Heading>
    </header>

    <div class="row body">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      uhrzeit: timeFormat()
    }
  },
  created: function () {
    let th = this
    setInterval(function () {
      th.uhrzeit = timeFormat()
    }, 1000)
  }
}

function timeFormat() {
  let date2 = new Date()
  let h = date2.getHours() - 1
  let m = date2.getMinutes()
  let s = date2.getSeconds()
  let hs = '' + h
  let ms = '' + m
  let ss = '' + s
  if (h < 10) {
    hs = '0' + h
  }
  if (m < 10) {
    ms = '0' + m
  }
  if (s < 10) {
    ss = '0' + s
  }
  let out
  if (h !== 0) {
    out = hs + ':' + ms + ':' + ss
  } else {
    out = ms + ':' + ss
  }
  return out
}
</script>

<style scoped lang="css">
.logo {
  height: 15vh;
}
.heading {
  margin-top: 1vh;
  height: 15vh;
}
.body {
  margin-top: 2vh;
  height: 70vh;
}
</style>
