<template>
  <Header />
  <v-main class="d-flex">
    <ChatList
      :changeMode="changeMode"
      :changeRoom="changeRoom"
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
      rooms: [],

      success: "",
      error: ""
    })
    // 初回読み込み
    const initChatRoom = async () => {
      loading.value = true
      try {
        params.company_chat = await chatApiFunc.getCompanyChat()
        params.rooms = params.company_chat.rooms.items
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    initChatRoom()

    // 表示モード切り替え
    const mode = ref('home')
    const changeMode = (_mode) => {
      mode.value = _mode
    }

    const changeRoom = (room) => {
      params.view_room = {}
      params.success = ""
      params.error = ""
      params.view_room = room
      mode.value = 'room'
    }

    const messageSet = (message, type) => {
      params[type] = message
    }

    // データ共有
    provide('params', params)
    provide('init-chat-room', initChatRoom)
    provide('message-set', messageSet)

    return {
      loading,
      mode,
      changeMode,
      changeRoom,
    }
  }
}
</script>
