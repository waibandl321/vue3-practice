<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      <AppAlert
        :success="params.success"
        :error="params.error"
      />
      <div>
        <v-progress-linear
          v-if="params.loading"
          indeterminate
          color="primary"
          class="mt-4"
        ></v-progress-linear>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">従業員番号</th>
              <th class="text-left">氏名</th>
              <th class="text-left">従業員種別</th>
              <th class="text-left">ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.company_employee_id"
              @click="recordClick(item)"
            >
              <td>{{ item.employee_number }}</td>
              <td>{{ item.last_name }} {{ item.first_name }}</td>
              <td>{{ item.permanent === 0 ? '社員' : '臨時' }}</td>
              <td>{{ item.status === 0 ? '登録済み' : '未登録' }}</td>
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
import AppAlert from '@/components/common/AppAlert.vue'

import { ref, watch } from 'vue'

export default {
  name: 'employee-list',
  components: { MasterLeftMenu, AppAlert },
  props: {
    params: Object,
    setViewer: Function,
    setEditor: Function,
  },
  setup (props) {
    // データ読み込み
    const items = ref([])
    const init = async () => {
      items.value = props.params.items
    }
    watch(
      () => props.params.items,
      () => {
        init()
      },
      { deep: true }
    )
    init()

    // 詳細遷移
    const recordClick = (item) => {
      props.setViewer(item)
    }

    // 新規作成
    const clickNew = () => {
      const is_new = true
      props.setEditor(is_new)
    }

    return {
      items,
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