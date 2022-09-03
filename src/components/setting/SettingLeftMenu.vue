<template>
  <v-list>
    <v-list-item
      v-for="(item, idx) in setting_menus"
      :key="idx"
      :title="item.text"
      link
      :to="item.path"
    ></v-list-item>
  </v-list>
</template>
<script>
export default {
  setup () {
    // eslint-disable-next-line camelcase
    const setting_menus = [
      {
        key: 'setting-account',
        text: 'アカウント',
        path: '/setting/account'
      },
      {
        key: 'setting-services',
        text: '全てのサービス',
        path: '/setting/services'
      }
    ]
    return {
      setting_menus
    }
  }
}
</script>
