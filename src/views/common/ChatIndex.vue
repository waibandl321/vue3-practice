<template>
  <Header />
  <v-main class="d-flex">
    <ChatList
      :changeMode="changeMode"
      :changeRoom="changeRoom"
      ref="chatRoomList"
    />
    <ChatHome
      v-if="mode === 'home'"
    />
    <ChatRoom
      v-if="mode === 'room'"
      :changeMode="changeMode"
      :refreshRoomList="refreshRoomList"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ChatList from '@/components/common/chat/room/ChatRoomList.vue';
import ChatHome from '@/components/common/chat/ChatHome.vue';
import ChatRoom from '@/components/common/chat/ChatRoom.vue';

import chatApiFunc from '@/mixins/api/func/chat'
import fileApiFunc from '@/mixins/api/func/file'

import { ref, reactive } from 'vue';
import { onBeforeMount, provide } from '@vue/runtime-core';

export default {
  name: 'chat-view',
  components: {
    Header,
    ChatList,
    ChatHome,
    ChatRoom
  },
  setup () {
    const chatRoomList = ref()
    const loading = ref(false)
    const params = reactive({
      company_employees: [],
      dir_top: "",

      company_chat: {},
      rooms: [],
      
      room_viewer: {},
      room_editor: {},

      loading: "",
      success: "",
      error: ""
    })

    // ファイル管理ディレクトリ
    onBeforeMount( async () => {
      try {
        params.dir_top = await fileApiFunc.apiGetDirTop()
      } catch (error) {
        console.error(error);
      }
    })

    // チャットデータ読み込み
    const initChatRoom = async () => {
      loading.value = true
      try {
        const result = await chatApiFunc.getCompanyChat()
        params.company_chat = result
        params.rooms = result.rooms.items
        params.company_employees = result.company_employees.items
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    initChatRoom()

    const refreshRoomList = async () => {
      params.rooms = await chatApiFunc.getChatRooms(params.company_chat.id)
    }

    // 表示モード切り替え
    const mode = ref('home')
    const changeMode = (_mode) => {
      mode.value = _mode
    }

    // トークルーム切り替え
    const changeRoom = (room) => {
      params.room_viewer = {}
      params.success = ""
      params.error = ""
      params.room_viewer = room
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
      chatRoomList,
      loading,
      mode,
      changeMode,
      changeRoom,
      refreshRoomList,
    }
  }
}
</script>
