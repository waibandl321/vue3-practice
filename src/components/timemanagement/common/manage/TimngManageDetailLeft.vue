<template>
  <v-card class="manage-detail-left">
    <v-list>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="index"
        :title="menu.name"
        link
        density="compact"
        @click="changePage(menu.key)"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    menus: {
      type: Object
    },
    changePage: {
      type: Function
    }
  },
  setup() {
    
  },
}
</script>

<style scoped>
.manage-detail-left {
  min-width: 240px;
  max-width: 240px;
  height: calc(100vh - 48px);
  position: sticky;
  top: 48px;

}
</style>