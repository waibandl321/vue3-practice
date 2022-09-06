<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      {{ items }}
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
                        > スタッフグループ </v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn 
                          variant="text"
                          color="primary"
                          block
                          @click.stop="clickStaffList(item)"
                        > 従業員一覧 </v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn variant="text"
                          color="primary"
                          block> 店舗削除 </v-btn>
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
    changeMode: Function
  },
  setup () {
    const items = ref([])
    const getShopList = async () => {
      items.value = await shopApiFunc.apiGetShops()
    }
    getShopList()

    const list_menu = ref(null)
    const clickListMenu = (shop_cd) => {
      if(list_menu.value) {
        list_menu.value = null
      } else {
        list_menu.value = shop_cd
      }
    }

    const is_new = true

    return {
      items,
      is_new,
      list_menu,
      clickListMenu
    }
  },
  methods: {
    recordClick (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = item
      this.changeMode('view')
    },
    clickInviteShop(shop) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = shop
      this.changeMode('invite')
    },
    clickStaffGroup(shop) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = shop
      this.changeMode('staff-group-list')
    },
    clickStaffList(shop) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = shop
      this.changeMode('staff-list')
    },
    clickNew () {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.editor = {
        shop_cd: "",
        shop_name: "",
        shop_name_kana: "",
        brand_cd: "",
        area_cd: "",
        address: "",
        phone: "",
        status: 0,
        delete: 0
      }
      this.changeMode('edit', this.is_new)
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
.drop-items {
  width: 200px;
  position: absolute;
  right: 0;
  z-index: 2;
}
  </style>
