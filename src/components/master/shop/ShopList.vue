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

    const is_new = true

    return {
      items,
      is_new
    }
  },
  methods: {
    recordClick (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = item
      this.changeMode('view')
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
  </style>
