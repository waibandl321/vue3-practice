<template>
  <div class="d-flex">
  <TimngManageLeft :menus="menus" />
  <div class="list-body">
    <v-table>
        <thead>
          <tr>
            <th class="text-left">
              テンプレート
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="setViewer('hogehoge')"
          >
            <td>テンプレート名</td>
            <td>あああ</td>
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
}
</style>