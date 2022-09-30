<template>
  <v-card
    class="mx-auto chat-list"
    flat
  >
    <v-list>
      <v-list-item
        v-for="(item, idx) in master_menus"
        :key="idx"
        :title="item.meta.title"
        link
        :to="item.path"
        dense
      ></v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import routerFunc from '@/mixins/utils/route.js'

export default {
  setup () {
    const routes = routerFunc.getRoutes()
    const master_menus = routes.filter(v => v.path.includes('/master/'));
    
    return {
      master_menus
    }
  }
}
</script>
