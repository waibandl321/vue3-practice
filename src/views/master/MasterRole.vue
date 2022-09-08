<template>
  <Header />
  <v-main>
    <RoleList
      v-if="mode === 'list'"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import RoleList from '@/components/master/role/RoleList.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'master-role',
  components: {
    Header,
    RoleList
  },
  setup () {
    const mode = ref('list')
    return {
      mode
    }
  }
}
</script>
