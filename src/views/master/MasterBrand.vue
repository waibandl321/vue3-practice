<template>
  <Header />
  <v-main>
    <BrandList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <BrandDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <BrandEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import BrandList from '@/components/master/brand/BrandList.vue'
import BrandDetail from '@/components/master/brand/BrandDetail.vue'
import BrandEdit from '@/components/master/brand/BrandEdit.vue'
export default {
  name: 'master-brand',
  components: {
    Header,
    BrandList,
    BrandDetail,
    BrandEdit
  },
  data () {
    return {
      mode: 'list',
      params: {
        viewer: {},
        editor: {}
      }
    }
  },
  methods: {
    changeMode (_mode) {
      this.mode = _mode
    }
  }
}
</script>
