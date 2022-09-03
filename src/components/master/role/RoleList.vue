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
import roleMixin from '@/mixins/utils/role.js'
export default {
  name: 'role-list',
  components: {
    MasterLeftMenu
  },
  mixins: [roleMixin],
  data () {
    return {
      items: [],
      role_view: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.items = this.getSystemRoleList()
    }
  }
}
</script>
<style scoped>
select {
  border: 1px solid #ccc;
}
</style>
