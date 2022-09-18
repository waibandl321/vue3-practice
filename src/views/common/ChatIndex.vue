<template>
  <Header />
  <v-main class="d-flex">
    <ChatList
      v-if="!loading"
      :changeMode="changeMode"
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
import ChatList from '@/components/common/chat/ChatList.vue';
import ChatHome from '@/components/common/chat/ChatHome.vue';
import ChatRoom from '@/components/common/chat/ChatRoom.vue';

import chatApiFunc from '@/mixins/api/func/chat'
import { ref } from '@vue/reactivity';
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

    const initChatRoom = (room_data, crud) => {
      if(crud === 'create') {
        params.value.rooms.push(room_data)
      }
    }    

    provide('params', params.value)
    provide('initChatRoom', initChatRoom)

    const mode = ref('home')
    const changeMode = (_mode, room = null) => {
      mode.value = _mode
      params.value.view_room = room
    }

    return {
      loading,
      mode,
      changeMode,
      params
    }
  }
}
</script>
