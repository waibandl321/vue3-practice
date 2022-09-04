<template>
  <Header />
  <v-main>
    <PositionList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <PositionDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <PositionEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import PositionList from '@/components/master/position/PositionList.vue'
import PositionDetail from '@/components/master/position/PositionDetail.vue'
import PositionEdit from '@/components/master/position/PositionEdit.vue'
  
  export default {
    name: 'master-position',
    components: {
    Header,
    PositionList,
    PositionDetail,
    PositionEdit
},
    data () {
      return {
        mode: 'list',
        params: {
          viewer: {},
          editor: {},
          is_new: false
        }
      }
    },
    methods: {
      changeMode (_mode, is_new = false) {
        if(is_new) {
          this.params.is_new = true
        }
        this.mode = _mode
      }
    }
  }
  </script>