<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      <div>
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
                <div class="drop-menu">
                  <v-btn
                      icon="mdi-dots-vertical"
                      size="small"
                      variant="text"
                      @click.stop="clickListMenu(item.shop_cd)"
                    ></v-btn>
                    <v-list
                      v-if="list_menu === item.shop_cd"
                      class="drop-items"
                      border
                    >
                      <v-list-item>
                        <v-btn
                          variant="text"
                          color="primary"
                          block
                          @click.stop="clickInviteShop(item)"
                        >店舗参加用QRを表示</v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn variant="text"
                          color="primary"
                          block
                          @click.stop="clickStaffGroup(item)"
                        >スタッフグループ</v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn 
                          variant="text"
                          color="primary"
                          block
                          @click.stop="clickStaffList(item)"
                        >従業員一覧</v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn variant="text"
                          color="primary"
                          block
                        >店舗削除</v-btn>
                      </v-list-item>
                    </v-list>
                </div>
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
    // 店舗一覧取得
    const items = ref([])
    const getShopList = async () => {
      items.value = await shopApiFunc.apiGetShops()
    }
    getShopList()
    // リストクリックで詳細へ
    const recordClick = (item) => {
      props.setViewer(item)
      props.changeMode('view')
    }
    // リストメニュー展開
    const list_menu = ref(null)
    const clickListMenu = (shop_cd) => {
      if(list_menu.value) {
        list_menu.value = !list_menu.value
      } else {
        list_menu.value = shop_cd
      }
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
      props.changeMode('edit', is_new)
    }

    return {
      items,
      is_new,
      list_menu,
      clickListMenu,
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
