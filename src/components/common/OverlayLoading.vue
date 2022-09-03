<template>
  <div class="overlay-loading">
    <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>
</template>
<style scoped>
.overlay-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(0,0,0,.5);
}
</style>
