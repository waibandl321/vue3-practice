<template>
  <Header />
  <v-main class="d-flex">
    <ChatList      
      :changeMode="changeMode"
      :changeRoom="changeRoom"
      ref="roomlistRef"
    />
    <ChatHome
      v-if="mode === 'home'"
    />
    <ChatRoom
      v-if="mode === 'room'"
      :changeMode="changeMode"
      ref="roomViewRef"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ChatList from '@/components/common/chat/room/ChatRoomList.vue';
import ChatHome from '@/components/common/chat/ChatHome.vue';
import ChatRoom from '@/components/common/chat/ChatRoom.vue';

import chatApiFunc from '@/mixins/api/func/chat'

import { ref, reactive } from 'vue';
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
    const params = reactive({
      company_employees: [],
      company_chat: {},
      view_room: null,
      rooms: []
    })
    // 初回読み込み
    const init = async () => {
      loading.value = true
      try {
        params.company_chat = await chatApiFunc.getCompanyChat()
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
    const changeMode = (_mode) => {
      mode.value = _mode
    }
    const roomViewRef = ref()
    const changeRoom = async (room) => {
      params.view_room = room
      mode.value = 'room'
    }
    // データ共有
    provide('params', params)
    provide('init-chat-room', initChatRoom)

    return {
      loading,
      mode,
      changeMode,
      changeRoom,
      params,
      roomlistRef,
      roomViewRef
    }
  }
}
</script>
