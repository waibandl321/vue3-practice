<template>
  <Header />
  <v-main>
    <ShopList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <ShopDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <ShopEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ShopList from '@/components/master/shop/ShopList.vue'
import ShopEdit from '@/components/master/shop/ShopEdit.vue'
import ShopDetail from '../../components/master/shop/ShopDetail.vue'
import areaApiFunc from '@/mixins/api/master/area.js'
import brandApiFunc from '@/mixins/api/master/brand.js'

export default {
  name: 'master-shop',
  components: {
    Header,
    ShopList,
    ShopEdit,
    ShopDetail
  },
  data () {
    return {
      mode: 'list',
      params: {
        viewer: {},
        editor: {},
        is_new: false,

        brands: [],
        areas: []
      }
    }
  },
  async created () {
    this.params.brands = await brandApiFunc.apiGetBrand()
    this.params.areas = await areaApiFunc.apiGetArea()
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
