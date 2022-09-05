<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      <div>
        <v-select
          v-model="role_view"
          :items="items"
          item-title="role_name"
          item-value="role_cd"
          return-object
          single-line
        ></v-select>
      </div>
      <div>権限レベル: {{ role_view }}</div>
    </v-col>
  </v-row>
</template>
<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import roleFunc from '@/mixins/api/master/role.js'
import { ref } from 'vue'
export default {
  name: 'role-list',
  components: {
    MasterLeftMenu
  },
  setup () {
    const items = ref([])
    const role_view = ref(null)
    const getRoles = () => {
      items.value = roleFunc.getSystemRoleList()
    }
    getRoles()
    return {
      items,
      role_view
    }
  }
}
</script>
<style scoped>
select {
  border: 1px solid #ccc;
}
</style>
