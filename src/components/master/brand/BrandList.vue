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
              <th class="text-left">コード</th>
              <th class="text-left">ブランド名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.brand_id"
              @click="recordClick(item)"
            >
              <td>{{ item.brand_cd }}</td>
              <td>{{ item.brand_name }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import brandApiFunc from '@/mixins/api/master/brand.js'
import { ref } from 'vue'

export default {
  name: 'brand-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function
  },
  setup () {
    const items = ref([])
    const getBrands = async () => {
      items.value = await brandApiFunc.apiGetBrand()
    }
    getBrands()

    return {
      items
    }
  },
  methods: {
    recordClick (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = item
      this.changeMode('view')
    }
  }
}
</script>
