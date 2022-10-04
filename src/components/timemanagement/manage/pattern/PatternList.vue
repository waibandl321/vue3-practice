<template>
  <div class="d-flex">
  <TimngManageLeft :menus="menus" />
  <div class="list-body">
    業務パターン一覧
  </div>
  </div>
</template>

<script>
import timngUtils from '@/mixins/api/timemanagement/utils.js'
import TimngManageLeft from '@/components/timemanagement/common/TimngManageLeftMenu.vue'

export default {
  components: {
    TimngManageLeft
  },
  setup() {
    const menus = timngUtils.getTimngManageMenu()
    return {
      menus
    }
  },
}
</script>
<style scoped>
.list-body{
  width: 100%;
}
</style>