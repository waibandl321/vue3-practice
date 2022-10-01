<template>
  <PcHeader />
  <v-main>
    <v-container>
      企業：{{ company }}
      <v-card
        v-for="(func, idx) in arr"
        :key="idx"
        border
        link
        @click="func.callback"
      >
        <v-card-text>{{ func.text }}</v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import PcHeader from '@/components/common/AppHeader.vue';
import companyApiFunc from '@/mixins/api/master/company.js'
import chatApiFunc from '@/mixins/api/func/chat.js'
import forumApiFunc from '@/mixins/api/func/forum.js'
import fileApiFunc from '@/mixins/api/func/file.js'
import { ref } from '@vue/reactivity';
export default {
  name: "init-chat-forum-file",
  components: { PcHeader },
  setup () {
    const company = ref({})
    const getCompany = async () => {
      company.value = await companyApiFunc.apiGetCompany()
    }
    getCompany()
    
    const initForum = async () => {
      try {
        await forumApiFunc.apiCreateForum(...company.value)
        alert('掲示板を作成しました')
      } catch (error) {
        console.log(error);
      }
    }
    const initChat = async () => {
      try {
        await chatApiFunc.apiCreateChat(...company.value)
        alert('チャットを登録しました')
      } catch (error) {
        console.log(error);
      }
    }
    const initFile = async () => {
      try {
        await fileApiFunc.apiCreateTopDir(...company.value)
        alert('ファイル管理 TOPディレクトリを登録しました')
      } catch (error) {
        console.log(error);
      }
    }
    const arr = [
      { key: "file", callback: initFile, text: "ファイル管理 初期データ登録" },
      { key: "forum", callback: initForum, text: "掲示板 初期データ登録" },
      { key: "chat", callback: initChat, text: "チャット 初期データ登録" },
    ]
    return {
      arr,
      company
    }
  }
}
</script>
<style scoped>
.v-card + .v-card {
  margin-top: 24px;
}
</style>