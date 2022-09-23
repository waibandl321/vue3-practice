<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="clickMenuIcon()"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <v-btn to="/">ホーム</v-btn>
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
  <FixedSideMenu v-if="side_menu" />
</template>
<script>
import { Auth } from 'aws-amplify'
import FixedSideMenu from '@/components/common/FixedSideMenu.vue'
export default {
  components: {
    FixedSideMenu
  },
  data () {
    return {
      side_menu: false,
      header_icons: [
        { icon: 'mdi-bell', path: '/notification', title: 'お知らせ' },
        { icon: 'mdi-chat-processing-outline', path: '/chat', title: 'チャット' },
        { icon: 'mdi-clipboard-edit-outline', path: '/forum', title: '掲示板' },
        { icon: 'mdi-folder-multiple-outline', path: '/file', title: 'ファイル管理' }
      ]
    }
  },
  methods: {
    async signout () {
      try {
        await Auth.signOut()
        this.$router.push('/auth/signin')
      } catch (error) {
        console.log('error signing out: ', error)
      }
    },
    clickMenuIcon () {
      this.side_menu = !this.side_menu
    }
  }
}
</script>
<style scoped>
.v-toolbar {
  overflow: visible;
}
</style>
