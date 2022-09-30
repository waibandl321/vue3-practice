<template>
  <Header />
  <v-main v-if="!params.loading">
    <ForumList
      v-if="mode === 'list'"
      :params="params"
      :setEditor="setEditor"
      :setViewer="setViewer"
      :messageSet="messageSet"
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
      :messageSet="messageSet"
      :initForum="initForum"
    />
  </v-main>
  <OverlayLoading v-if="params.loading" />
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ForumList from '@/components/common/forum/ForumList.vue';
import ForumDetail from '@/components/common/forum/ForumDetail.vue';
import ForumEdit from '@/components/common/forum/ForumEdit.vue';
import OverlayLoading from '@/components/common/OverlayLoading.vue';

import utilsFunc from '@/mixins/utils/utils.js'
import apiFunc from '@/mixins/api/api.js'

import { reactive, ref } from '@vue/reactivity';
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

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
    const mode = ref('list')

    const params = reactive({
      items: [],
      tag_options: [],
      forum: {},
      // tag_options: {
      //   items: []
      // },
      viewer: {},
      editor: {},

      dir_top: {},

      loading: false,
      success: "",
      error: "",
      is_new: false
    })

    // データ取得
    const initForum = async () => {
      params.loading = true
      params.items = []
      try {
        params.forum = await apiFunc.apiGetForum()
        await dataShaping()
      } catch (error) {
        params.error = "読み込みに失敗しました。"
        console.error('func:forumApiFunc.getForum', error)
      }
      params.loading = false
    }
    initForum()

    async function dataShaping () {
      for (const post of params.forum.posts.items) {
        post.eyecatch_url = await getPreviewerFile(post)
        params.items.push(post)
      }
      params.tag_options = params.forum.tag_options.items
      
      async function getPreviewerFile (post) {
        if(post.eyecatch.items.length === 0) return undefined;
        const requset_url = utilsFunc.removeUrlQuery(post.eyecatch.items[0].data_url)
        return await utilsFunc.getImageObjectURL(requset_url)
      }
    }
    
    // 詳細遷移
    const setViewer = (post) => {
      params.success = ""
      params.error = ""
      params.viewer = post
      mode.value = 'detail'
    }
    // 編集遷移
    const setEditor = (post, is_new = false) => {
      params.success = ""
      params.error = ""
      if(is_new) {
        params.is_new = true
        params.editor = {
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
      } else {
        params.is_new = false
        params.editor = _.cloneDeep(post)
        params.editor.old_tags = _.cloneDeep(post.tags.items)
        params.editor.old_urls = _.cloneDeep(post.urls.items)
        params.editor.old_eyecatch = _.cloneDeep(post.eyecatch.items)
        params.editor.old_files = _.cloneDeep(post.files.items)
      }
      
      mode.value = 'edit'
    }
    // 表示モード変更
    const changeMode = (_mode) => {
      params.is_new = false
      mode.value = _mode
    }

    const messageSet = (message, type) => {
      params[type] = message
    }

    const readFileDir = async () => {
      params.dir_top = await apiFunc.apiGetTopDir()
    }
    readFileDir()

    // ファイル管理から選択モーダル用
    provide('params', params)
    
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      messageSet,
      initForum
    }
  }
}
</script>
