<template>
  <Header />
  <v-main>
    <PositionList
      v-if="mode === 'list'"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import PositionList from '@/components/master/position/PositionList.vue'
export default {
  name: 'master-area',
  components: {
    Header,
    PositionList
  },
  data () {
    return {
      mode: 'list'
    }
  }
}
</script>
