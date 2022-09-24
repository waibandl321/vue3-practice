<template>
  <Header />
  <v-main>
    <BrandList
      v-if="mode === 'list'"
      :setEditor="setEditor"
      :setViewer="setViewer"
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
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import BrandList from '@/components/master/brand/BrandList.vue'
import BrandDetail from '@/components/master/brand/BrandDetail.vue'
import BrandEdit from '@/components/master/brand/BrandEdit.vue'
import { reactive, ref } from '@vue/reactivity'

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
      viewer: {},
      editor: {},
      is_new: false
    })
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
      params.viewer = item
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
        params.editor = item
      }
      mode.value = 'edit'
    }
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor
    }
  },
}
</script>
