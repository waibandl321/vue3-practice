<template>
  <div class="d-flex">
  <TimngManageLeft :menus="menus" />
  <div class="list-body">
    <v-table>
        <thead>
          <tr>
            <th class="text-left">テンプレート</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="setViewer('hogehoge')"
          >
            <td>テンプレート名</td>
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
                  テンプレートを削除
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