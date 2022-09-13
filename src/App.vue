<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.im-container {
  padding-bottom: 120px!important;
}
.short-td {
  min-width: 56px;
  max-width: 56px;
  width: 56px;
  text-align: center;
}
.fixed-footer {
  position: fixed;
  height: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
.red {
  color: red;
}
</style>