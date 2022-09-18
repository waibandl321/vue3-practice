<template>
  <Header />
  <v-main class="d-flex">
    <ChatList
      :changeMode="changeMode"   
    />
    <ChatHome
      v-if="mode === 'home'"
      :changeMode="changeMode"
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
import { ref } from '@vue/reactivity';
import ChatRoom from '@/components/common/chat/ChatRoom.vue';
export default {
  name: 'chat-view',
  components: {
    Header,
    ChatList,
    ChatHome,
    ChatRoom
},
  setup () {
    const mode = ref('home')
    const changeMode = (_mode) => {
      mode.value = _mode
    }
    return {
      mode,
      changeMode
    }
  }
}
</script>
