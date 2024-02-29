<!-- 
  Author: Lucas Höttler
 -->
<template>
  <div class="heading-logo">
    <div class="col">
      <slot name="logo"></slot>
    </div>
  </div>
  <div class="col">
    <h2 class="header"><slot name="heading"></slot></h2>
    <slot name="subheading"></slot>
  </div>
  <div class="heading-uhr">
    <div class="col">
      <h3 class="header"><slot name="uhr"></slot></h3>
    </div>
  </div>
</template>

<style scoped>
.heading-logo {
  height: 100%;
  width: fit-content;
}

.heading-uhr {
  text-align: right;
  width: fit-content;
}
</style>
