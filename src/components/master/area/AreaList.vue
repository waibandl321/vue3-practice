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
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">コード</th>
              <th class="text-left">エリア名</th>
              <th></th>
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
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      v-bind="props"
                      icon="mdi-dots-horizontal"
                      size="small"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      density="compact"
                      link
                      @click="deleteArea(item)"
                    >
                      エリアを削除
                    </v-list-item>
                  </v-list>
                </v-menu>
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
import AppAlert from '@/components/common/AppAlert.vue'

import areaApiFunc from '@/mixins/api/master/area.js'
import { ref, watch } from 'vue'

export default {
  name: 'area-list',
  components: { MasterLeftMenu, AppAlert },
  props: {
    params: Object,
    setViewer: Function,
    setEditor: Function,
    initList: Function,
  },
  setup (props) {
    const items = ref([])
    // 一覧取得
    const getAreaList = () => {
      items.value = props.params.items
    }
    watch(
      () => props.params.items,
      () => {
        getAreaList()
      },
      { deep: true }
    )
    getAreaList()

    // 削除
    const deleteArea = async (area) => {
      try {
        await areaApiFunc.apiDeleteArea(area)
        items.value = items.value.filter(v => v.id !== area.id)
        props.initList()
        alert('エリアを削除しました')
      } catch (error) {
        console.error(error);
      }
    }

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
      deleteArea,
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
