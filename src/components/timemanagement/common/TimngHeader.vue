<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <v-app-bar-title>
      <v-menu
        v-for="(menu, idx) in menus"
        :key="idx"
        :open-on-hover="!menu.route"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            :to="menu.route"
          >
            {{ menu.text }}
          </v-btn>
        </template>
        <v-list
          v-show="!menu.route"
        >
          <v-list-item
            density="compact"
            v-for="(second, idx2) in menu.children"
            :key="idx2"
            link
            :title="second.meta.title"
            :to="'/timemanagement/' + second.path"
          ></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-title>
    
    <template v-for="(item, idx) in header_icons" :key="idx">
      <v-btn
        :icon="item.icon"
        :to="item.path"
        :title="item.title"
      ></v-btn>
    </template>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          icon="mdi-dots-vertical"
          size="small"
        ></v-btn>
      </template>
      <v-list>
        <v-list-item
          density="compact"
          link
          to="/auth/signout"
        >
          サインアウト
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import routerFunc from '@/mixins/utils/route.js'
import { reactive } from '@vue/reactivity'

export default {
  setup () {
    const routes = routerFunc.getRoutes()
    const menus = reactive({
      portal: {
        text: "ポータルトップ",
        route: "/"
      },
      home: {
        text: "ホーム",
        route: "/timemanagement"
      },
      shops: {
        text: "店舗一覧",
        route: "/timemanagement/shops"
      },
      manage: {
        text: '業務管理',
        children: []
      },
      myshop: {
        text: 'My店舗',
        children: []
      },
      routine: {
        text: '本日のタスク',
        route: '/timemanagement/routine/todaytask'
        
      },
      dashboard: {
        text: 'ダッシュボード',
        route: '/timemanagement/dashboard'
      }
    })
    const header_icons = [
      { icon: 'mdi-bell', path: '/notification', title: 'お知らせ' },
      { icon: 'mdi-chat-processing-outline', path: '/chat', title: 'チャット' },
      { icon: 'mdi-clipboard-edit-outline', path: '/forum', title: '掲示板' },
      { icon: 'mdi-folder-multiple-outline', path: '/file', title: 'ファイル管理' }
    ]

    const readRoutes = () => {
      const timemng_routes = routes.find(v => v.name === 'timng-index').children;
      for (const route of timemng_routes) {
        if(/myshop/.test(route.name)) {
          menus.myshop.children.push(route)
        }
        if(/manage/.test(route.name) && !/myshop/.test(route.name)) {
          menus.manage.children.push(route)
        }
      }
    }
    readRoutes()

    return {
      menus,
      header_icons,
    }
  },
}
</script>
<style scoped>
.v-toolbar {
  overflow: visible;
}
</style>
