<template>
  <Header />
  <v-main>
    <FileCapacity />
    <FileSearch />
    <FileList
      v-if="mode === 'list'"
      :changeMode="changeMode"
    />
    <FileListTrash
      v-if="mode === 'trash'"
      :changeMode="changeMode"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import { ref } from '@vue/reactivity';
import FileList from '@/components/common/file/FileList.vue';
import FileListTrash from '@/components/common/file/FileListTrash.vue';
import FileCapacity from '@/components/common/file/FileCapacity.vue';
import FileSearch from '@/components/common/file/FileSearch.vue';
export default {
  name: 'file-index',
  components: {
    Header,
    FileList,
    FileListTrash,
    FileCapacity,
    FileSearch
  },
  setup () {
    const mode = ref('list')
    const params = ref({})
    const changeMode = (_mode) => {
      mode.value = _mode
    }
    return {
      mode,
      params,
      changeMode
    }
  }
}
</script>
