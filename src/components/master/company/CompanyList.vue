<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
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
            <th class="text-left">
              企業名
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.company_id"
            @click="recordClick(item)"
          >
            <td>{{ item.company_name }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import { ref, watch } from 'vue'

export default {
  name: 'company-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function,
    setViewer: Function,
  },
  setup (props) {
    const loading = ref(false)
    const items = ref([])

    // 一覧取得
    const getCompnay = () => {
      items.value = props.params.items
    }
    watch(
      () => props.params.items,
      () => {
        getCompnay()
      },
      { deep: true }
    )
    getCompnay()

    // 詳細へ
    const recordClick = (item) => {
      props.setViewer(item)
      props.changeMode('view')
    }

    return {
      items,
      loading,
      recordClick
    }
  }
}
</script>
