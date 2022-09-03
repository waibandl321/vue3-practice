<template>
  <Header />
  <v-main>
    <AreaList
      v-if="mode === 'list'"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import AreaList from '@/components/master/area/AreaList.vue'
export default {
  name: 'master-area',
  components: {
    Header,
    AreaList
  },
  data () {
    return {
      mode: 'list'
    }
  }
}
</script>
