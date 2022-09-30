<template>
  <v-list class="fixed-left">
    <v-list-item
      v-for="(menu, idx) in menus"
      :key="idx"
      :to="menu.path"
      :title="menu.text"
      density="compact"
      link
    >
      <v-list v-if="menu.sub" class="second">
        <v-list-item
          v-for="(sub, idx2) in menu.sub"
          :key="idx2"
          :to="sub.path"
          :title="sub.text"
          link
          density="compact"
        ></v-list-item>
      </v-list>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    menus: [
      {
        key: 'home',
        text: 'ホーム',
        path: '/'
      },
      {
        key: 'master-admin',
        text: 'データ管理',
        sub: [
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
      },
      {
        key: 'setting',
        text: '設定',
        sub: [
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
      }
    ]
  })
}
</script>
<style scoped>
.fixed-left {
  background-color: #f8f5f5;
  position: fixed;
  top: 48px;
  left: 0;
  height: calc(100vh - 48px);
  width: 240px;
  z-index: 2;
}
.second {
  margin-left: 16px;
  background: inherit;
}
</style>
