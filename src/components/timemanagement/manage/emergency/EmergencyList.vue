<template>
  <div class="d-flex">
    <TimngManageLeft :menus="menus" />
    <div class="list-body">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              臨時タスク
            </th>
            <th class="text-left">
              適用期間
            </th>
            <th class="text-left">
              実施回数
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="setViewer('hogehoge')"
          >
            <td>臨時タスクテスト001</td>
            <td>2022-05-10 - 2022-07-31</td>
            <td>1回のみ</td>
            <td class="text-right">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    icon="mdi-dots-horizontal"
                    variant="text"
                  >
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    link
                    density="compact"
                  >
                    臨時タスクを削除
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import timngUtils from '@/mixins/api/timemanagement/utils.js'
import TimngManageLeft from '@/components/timemanagement/common/manage/TimngManageLeftMenu.vue'
import { inject } from '@vue/runtime-core'

export default {
  components: {
    TimngManageLeft
  },
  setup() {
    const setViewer = inject('set-viewer')
    const menus = timngUtils.getTimngManageMenu()

    return {
      menus,
      setViewer
    }
  },
}
</script>
<style scoped>
.list-body{
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>