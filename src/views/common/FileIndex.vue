<template>
  <Header />
  <v-main v-if="!loading">
    <FileCapacity  />
    <FileSearch />
    <FileList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <FileListTrash
      v-if="mode === 'trash'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
  <OverlayLoading v-else />
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import { ref } from '@vue/reactivity';
import FileList from '@/components/common/file/FileList.vue';
import FileListTrash from '@/components/common/file/FileListTrash.vue';
import FileCapacity from '@/components/common/file/FileCapacity.vue';
import FileSearch from '@/components/common/file/FileSearch.vue';
import fileApiFunc from '@/mixins/api/func/file'
import OverlayLoading from '@/components/common/OverlayLoading.vue';

export default {
  name: 'file-index',
  components: {
    Header,
    FileList,
    FileListTrash,
    FileCapacity,
    FileSearch,
    OverlayLoading
  },
  setup () {
    const mode = ref('list')
    const loading = ref(false)
    const params = ref({
      dir_top: {}
    })
    // 最上位ディレクトリ取得
    const getDirTop = async () => {
      loading.value = true
      params.value.dir_top = await fileApiFunc.apiGetDirTop()
      loading.value = false
    }
    getDirTop()
    // 表示モード切り替え
    const changeMode = (_mode) => {
      mode.value = _mode
    }
    return {
      loading,
      mode,
      params,
      changeMode
    }
  }
}
</script>
