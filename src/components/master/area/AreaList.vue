<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      {{ items }}
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
    setViewer: Function,
    setEditor: Function,
  },
  setup (props) {
    const loading = ref(false)
    const items = ref([])
    // 一覧取得
    const getAreaList = async () => {
      loading.value = true
      try {
        items.value = await areaApiFunc.apiGetArea()
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    getAreaList()

    // 詳細遷移
    const recordClick = (item) => {
      props.setViewer(item)
    }

    // 新規作成遷移
    const is_new = true
    const clickNew = () => {
      props.setEditor(undefined, is_new)
    }

    return {
      loading,
      items,
      is_new,
      recordClick,
      clickNew
    }
  },
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>
