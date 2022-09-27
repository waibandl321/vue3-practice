<template>
  <Header />
  <v-main>
    <BrandList
      v-if="mode === 'list'"
      :setEditor="setEditor"
      :setViewer="setViewer"
      :initList="initList"
      :params="params"
    />
    <BrandDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :setEditor="setEditor"
      :params="params"
    />
    <BrandEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :initList="initList"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import BrandList from '@/components/master/brand/BrandList.vue'
import BrandDetail from '@/components/master/brand/BrandDetail.vue'
import BrandEdit from '@/components/master/brand/BrandEdit.vue'

import brandApiFunc from '@/mixins/api/master/brand.js'
import { reactive, ref } from '@vue/reactivity'
import _ from 'lodash'

export default {
  name: 'master-brand',
  components: {
    Header,
    BrandList,
    BrandDetail,
    BrandEdit
  },
  setup () {
    const mode = ref('list')
    const params = reactive({
      items: [],
      viewer: {},
      editor: {},
      is_new: false
    })
    const initList = async () => {
      try {
        params.items = await brandApiFunc.apiGetBrand()
      } catch (error) {
        params.items = []
        console.error(error);
      }
    }
    initList()

    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.is_new = true
        params.editor.brand_cd = "",
        params.editor.brand_name = "",
        params.editor.status = 0,
        params.editor.delete = 0
      }
      mode.value = _mode
    }

    const setViewer = (item) => {
      params.viewer = _.cloneDeep(item)
      mode.value = 'view'
    }
    
    const setEditor = (item, is_new = false) => {
      if(is_new) {
        params.is_new = true
        params.editor = {
          brand_cd: "",
          brand_name: "",
          status: 0,
          delete: 0
        }
      } else {
        params.is_new = false
        params.editor = item
      }
      mode.value = 'edit'
    }
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      initList
    }
  },
}
</script>
