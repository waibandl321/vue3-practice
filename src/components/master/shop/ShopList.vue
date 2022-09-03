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
              <th class="text-left">コード</th>
              <th class="text-left">店舗名</th>
              <th class="text-left">エリア</th>
              <th class="text-left">ブランド</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.shop_id"
            >
              <td>{{ item.shop_cd }}</td>
              <td>{{ item.shop_name }}</td>
              <td>{{ item.area_cd }}</td>
              <td>{{ item.brand_cd }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
export default {
  name: 'shop-list',
  components: { MasterLeftMenu },
  setup () {
    const items = [
      {
        company_shop_cd: 'company_shop_001',
        shop_cd: '001',
        address: '',
        area_cd: '001',
        brand_cd: '001',
        company_cd: '001',
        shop_name_kana: 'テンポ001',
        shop_name: '店舗001',
        phone: '03-0000-0000',
        is_head: false,
        francisee_id: null,
        statsu: 0,
        delete: 0,
        updated_at: ''
      }
    ]
    return {
      items
    }
  }
}
</script>
