<template>
  <Header />
  <v-main v-if="!loading">
    <ForumList
      v-if="mode === 'list'"
      :params="params"
      :changeMode="changeMode"
      :setViewer="setViewer"
    />
    <ForumDetail
      v-if="mode === 'detail'"
      :params="params"
      :changeMode="changeMode"
      :setEditor="setEditor"
    />
    <ForumEdit
      v-if="mode === 'edit'"
      :params="params"
      :changeMode="changeMode"
      :initEditor="initEditor"
    />
  </v-main>
  <OverlayLoading v-if="loading" />
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ForumList from '@/components/common/forum/ForumList.vue';
import ForumDetail from '@/components/common/forum/ForumDetail.vue';
import ForumEdit from '@/components/common/forum/ForumEdit.vue';
import { ref } from '@vue/reactivity';
import forumApiFunc from '@/mixins/api/func/forum'
import OverlayLoading from '@/components/common/OverlayLoading.vue';
export default {
  name: 'forum-index',
  components: {
    Header,
    ForumList,
    ForumDetail,
    ForumEdit,
    OverlayLoading
},
  setup () {
    const loading = ref(false)
    const mode = ref('list')
    const params = ref({
      forum: {},
      viewer: {},
      editor: {},
      is_new: false
    })
    const changeMode = (_mode, is_new = false) => {
      params.value.is_new = false
      if(is_new) {
        params.value.is_new = true
        initEditor()
      }
      if(_mode === 'list') {
        // 一旦データリフレッシュ
        (async() => {
          loading.value = true
          try {
            params.value.forum = await forumApiFunc.getForum()
          } catch (error) {
            console.error('refresh posts exception error', error)
          }
          loading.value = false
        })()
      }
      mode.value = _mode
    }
    const initEditor = () => {
      params.value.editor = {
        title: "",
        post_text: "",
        files: {
          items: []
        },
        urls: {
          items: []
        },
        tags: {
          items: []
        },
        eyecatch: undefined
      }
    }
    const setViewer = (post) => {
      params.value.viewer = post
    }
    const setEditor = (post) => {
      params.value.editor = post
    }
    const init = async () => {
      loading.value = true
      try {
        params.value.forum = await forumApiFunc.getForum()
        console.log(params.value.forum);
      } catch (error) {
        console.error('func:forumApiFunc.getForum', error)
      }
      
      loading.value = false
    }
    init()
    return {
      loading,
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      initEditor
    }
  }
}
</script>
