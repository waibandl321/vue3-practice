<template>
  <v-card width="300">
    <v-list>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="index"
        :title="menu.name"
        link
        density="compact"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    menus: {
      type: Object
    }
  },
  setup() {
    
  },
}
</script>