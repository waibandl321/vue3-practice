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
import AppAlert from '@/components/common/AppAlert.vue'
import MasterLeftMenu from '../MasterLeftMenu.vue'
import { ref, watch } from 'vue'

export default {
  name: 'brand-list',
  components: { MasterLeftMenu, AppAlert },
  props: {
    params: Object,
    setEditor: Function,
    setViewer: Function,
    initList: Function,
  },
  setup (props) {
    const items = ref([])
    // 一覧取得
    const getBrands = async () => {
      items.value = props.params.items
    }
    watch(
      () => props.params.items,
      () => {
        getBrands()
      },
      { deep: true }
    )
    getBrands()

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