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
              <th class="text-left">エリア名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.area_id"
              @click="recordClick(item)"
            >
              <td>{{ item.area_cd }}</td>
              <td>{{ item.area_name }}</td>
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
import areaApiFunc from '@/mixins/api/master/area.js'
import { ref } from 'vue'
export default {
  name: 'area-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function
  },
  setup () {
    const items = ref([])
    const getAreaList = async () => {
      items.value = await areaApiFunc.apiGetArea()
    }
    getAreaList()

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
        area_cd: "",
        area_name: "",
        company_cd: "",
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
