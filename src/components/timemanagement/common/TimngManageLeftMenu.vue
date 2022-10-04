<template>
  <v-card width="300">
    <v-list>
      <template v-for="(menu, index) in menus" :key="index">
        <v-list-item
          :title="menu.name"
          :link="!menu.children"
          :to="menu.route"
          :class="{ 'manage-menu-active': menu.key === current_route_path }"
          density="compact"
        ></v-list-item>
        <template
          v-if="menu.children"
        >
          <v-list-item
            v-for="(second_menu, index2) in menu.children"
            :key="index2"
            :title="second_menu.name"
            :to="second_menu.route"
            :class="{ 'manage-menu-active': second_menu.key === current_route_path }"
            link
            density="compact"
            class="manage-menu-second"
          ></v-list-item>
        </template>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import routeFunc from "@/mixins/utils/route.js"
export default {
  props: {
    menus: {
      type: Object
    }
  },
  setup() {
    const current_route = routeFunc.getCurrentRoute()
    const current_route_path = current_route.path.substring(current_route.path.lastIndexOf('/') + 1)

    return {
      current_route_path
    }
  },
}
</script>

<style scoped>
.manage-menu-second {
  margin-left: 24px;
}
.manage-menu-active{
  background-color: #1867c0;
  color: #fff;
}
</style>