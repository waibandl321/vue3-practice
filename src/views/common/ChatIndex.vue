<template>
  <Header />
  <v-main class="d-flex">
    <ChatList      
      :changeMode="changeMode"
      ref="roomlistRef"
    />
    <ChatHome
      v-if="mode === 'home'"
    />
    <ChatRoom
      v-if="mode === 'room'"
      :changeMode="changeMode"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ChatList from '@/components/common/chat/room/ChatRoomList.vue';
import ChatHome from '@/components/common/chat/ChatHome.vue';
import ChatRoom from '@/components/common/chat/ChatRoom.vue';

import chatApiFunc from '@/mixins/api/func/chat'

import { ref } from 'vue';
import { provide } from '@vue/runtime-core';

export default {
  name: 'chat-view',
  components: {
    Header,
    ChatList,
    ChatHome,
    ChatRoom
  },
  setup () {
    const loading = ref(false)
    const params = ref({
      company_chat: {},
      view_room: null,
      rooms: []
    })
    // 初回読み込み
    const init = async () => {
      loading.value = true
      try {
        params.value.company_chat = await chatApiFunc.getCompanyChat()
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    init()
    // 一覧更新
    const roomlistRef = ref()
    const initChatRoom = async () => {
      await roomlistRef.value.init()
    }
    // 表示モード切り替え
    const mode = ref('home')
    const changeMode = (_mode, room = null) => {
      mode.value = _mode
      params.value.view_room = room
    }
    // データ共有
    provide('params', params.value)
    provide('init-chat-room', initChatRoom)

    return {
      loading,
      mode,
      changeMode,
      params,
      roomlistRef
    }
  }
}
</script>
