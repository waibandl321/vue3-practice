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
    <v-btn to="/auth/signout">サインアウト</v-btn>
    <template v-for="(item, idx) in header_icons" :key="idx">
      <v-btn
        :icon="item.icon"
        :to="item.path"
        :title="item.title"
      ></v-btn>
    </template>
    <v-btn icon="mdi-dots-vertical"></v-btn>
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
        { icon: 'mdi-chat', path: '/chat', title: 'チャット' },
        { icon: 'mdi-forum', path: '/forum', title: '掲示板' },
        { icon: 'mdi-folder', path: '/file', title: 'ファイル管理' }
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
