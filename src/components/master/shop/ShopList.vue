<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      <div>
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="green"
          class="mt-4"
        ></v-progress-linear>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">店舗コード</th>
              <th class="text-left">店舗名</th>
              <th class="text-left">エリア</th>
              <th class="text-left">ブランド</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.shop_id"
              @click="recordClick(item)"
            >
              <td>{{ item.shop_cd }}</td>
              <td>{{ item.shop_name }}</td>
              <td>{{ item.area_cd }}</td>
              <td>{{ item.brand_cd }}</td>
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      v-bind="props"
                      icon="mdi-dots-horizontal"
                      size="small"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      density="compact"
                      link
                      title="店舗参加用QRを表示"
                      @click.stop="clickInviteShop(item)"
                    ></v-list-item>
                    <v-list-item
                      density="compact"
                      link
                      title="スタッフグループ"
                      @click.stop="clickStaffGroup(item)"
                    ></v-list-item>
                    <v-list-item
                      density="compact"
                      link
                      title="従業員一覧"
                      @click.stop="clickStaffList(item)"
                    ></v-list-item>
                    <v-list-item
                      density="compact"
                      link
                      title="店舗削除"
                    ></v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="fixed-btn">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="x-large"
          @click="clickNew()"
        ></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import shopApiFunc from '@/mixins/api/master/shop.js'
import { ref } from 'vue'
export default {
  name: 'shop-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function,
    setViewer: Function,
    setEditor: Function,
  },
  setup (props) {
    const loading = ref(false)
    // 店舗一覧取得
    const items = ref([])
    const getShopList = async () => {
      loading.value = true
      try {
        items.value = await shopApiFunc.apiGetShops()
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    getShopList()

    // 詳細遷移
    const recordClick = (item) => {
      props.setViewer(item)
      props.changeMode('view')
    }
    
    // 店舗参加用QR表示
    const clickInviteShop = (shop) => {
      props.setViewer(shop)
      props.changeMode('invite')
    } 
    // スタッフグループ画面へ
    const clickStaffGroup = (shop) => {
      props.setViewer(shop)
      props.changeMode('staff-group')
    }
    // 店舗従業員一覧へ
    const clickStaffList = (shop) => {
      props.setViewer(shop)
      props.changeMode('staff-list')
    }
    // 新規店舗登録
    const is_new = true
    const clickNew = () => {
      props.setEditor(null, is_new)
    }

    return {
      loading,
      items,
      is_new,
      clickInviteShop,
      clickStaffGroup,
      clickStaffList,
      recordClick,
      clickNew
    }
  }
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
.drop-menu {
  position: relative;
}
  </style>
