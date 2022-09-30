<template>
  <v-list>
    <v-list-item
      v-for="(item, idx) in setting_menus"
      :key="idx"
      :title="item.meta.title"
      link
      :to="item.path"
    ></v-list-item>
  </v-list>
</template>

<script>
import routerFunc from '@/mixins/utils/route.js'

export default {
  setup () {
    const routes = routerFunc.getRoutes()
    const setting_menus = routes.filter(v => v.path.includes('/setting/'));
    
    return {
      setting_menus
    }
  }
}
</script>
