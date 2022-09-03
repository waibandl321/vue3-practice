<template>
  <v-row>
    <v-col cols="2">
      <SettingLeftMenu />
    </v-col>
    <v-col cols="10">
      アカウント
    </v-col>
  </v-row>
</template>
<script>
import SettingLeftMenu from '../SettingLeftMenu.vue'
export default {
  name: 'account-detail',
  components: {
    SettingLeftMenu
  }
}
</script>
