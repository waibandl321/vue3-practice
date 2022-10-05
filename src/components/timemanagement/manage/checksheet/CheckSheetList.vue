<template>
  <div class="d-flex">
    <TimngManageLeft :menus="menus" />
    <div class="list-body">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">チェックシート名</th>
            <th class="text-left">区切り</th>
            <th class="text-left">タグ</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="setViewer('hogehoge')"
          >
            <td>チェックシート名</td>
            <td>一日</td>
            <td>タグ</td>
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
                  チェックシートを削除
                  </v-list-item>
                  <v-list-item
                    link
                    density="compact"
                  >
                    コピーして新規作成
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
import TimngManageLeft from '@/components/timemanagement/common/manage/TimngManageLeftMenu.vue'

import timngUtils from '@/mixins/api/timemanagement/utils.js'
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
  padding: 12px 12px 100px 12px;
  width: 100%;
}
</style>