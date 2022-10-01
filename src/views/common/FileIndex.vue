<template>
  <Header />
  <v-main v-if="!loading">
    <FileCapacity
      :params="params"
      :mutationCapacityOver="mutationCapacityOver"
    />
    <FileSearch />
    <FileList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
      :uploadedChange="uploadedChange"
    />
    <FileListTrash
      v-if="mode === 'trash'"
      :changeMode="changeMode"
      :params="params"
      :uploadedChange="uploadedChange"
    />
  </v-main>
  <OverlayLoading v-else />
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
import OverlayLoading from '@/components/common/OverlayLoading.vue';
import FileList from '@/components/common/file/FileList.vue';
import FileListTrash from '@/components/common/file/FileListTrash.vue';
import FileCapacity from '@/components/common/file/FileCapacity.vue';
import FileSearch from '@/components/common/file/FileSearch.vue';

import fileApiFunc from '@/mixins/api/func/file'

import { ref } from '@vue/reactivity';

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
      dir_top: {},
      dirs: [],
      uploaded_flag: false,
      capacity_over: false,
    })
    // 最上位ディレクトリ取得
    const init = async () => {
      loading.value = true
      params.value.dir_top = await fileApiFunc.apiGetDirTop()
      params.value.dirs = await fileApiFunc.apiGetDirs()
      loading.value = false
    }
    init()

    // 表示モード切り替え
    const changeMode = async (_mode) => {
      mode.value = _mode
    }

    // アップロードフラグ
    const uploadedChange = (flag) => {
      params.value.uploaded_flag = flag
    }

    // 容量over
    const mutationCapacityOver = (flag) => {
      params.value.capacity_over = flag
    }

    return {
      loading,
      mode,
      params,
      changeMode,
      uploadedChange,
      mutationCapacityOver
    }
  }
}
</script>
