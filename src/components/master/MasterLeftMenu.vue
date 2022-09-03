<template>
  <v-list>
    <v-list-item
      v-for="(item, idx) in master_menus"
      :key="idx"
      :title="item.text"
      link
      :to="item.path"
      dense
    ></v-list-item>
  </v-list>
</template>
<script>
export default {
  setup () {
    // eslint-disable-next-line camelcase
    const master_menus = [
      {
        key: 'master-company',
        text: '企業',
        path: '/master/company'
      },
      {
        key: 'master-brand',
        text: 'ブランド',
        path: '/master/brand'
      },
      {
        key: 'master-area',
        text: 'エリア',
        path: '/master/area'
      },
      {
        key: 'master-position',
        text: 'ポジション',
        path: '/master/position'
      },
      {
        key: 'master-shop',
        text: '店舗',
        path: '/master/shop'
      },
      // {
      //   key: 'master-facility',
      //   text: '店舗設備',
      //   path: '/master/facility'
      // },
      {
        key: 'master-employee',
        text: '従業員',
        path: '/master/employee'
      },
      {
        key: 'master-role',
        text: 'ロール',
        path: '/master/role'
      }
    ]
    return {
      master_menus
    }
  }
}
</script>
