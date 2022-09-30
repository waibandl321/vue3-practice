<template>
  <v-card
    class="mx-auto chat-list"
    width="300"
    flat
  >
    <v-list>
      <v-list-item 
        prepend-icon="mdi-home"
        title="Home"
        link
        @click="backFunc()"
      ></v-list-item>
      <v-list-group
        value="Grou"
      >
        <template
          v-if="group_rooms.length > 0"
          v-slot:activator="{ props }"
        >
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-group"
            title="グループ"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="(group, index) in group_rooms"
          :key="index"
          :title="group.room_name"
          @click="moveRoom(group)"
        ></v-list-item>
      </v-list-group>
      <v-list-group
        value="Personal"
      >
        <template
          v-if="personal_rooms.length > 0"
          v-slot:activator="{ props }"
        >
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="個人"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="personal in personal_rooms"
          :key="personal.id"
          :title="personal.room_name"
          @click="moveRoom(personal)"
        ></v-list-item>
      </v-list-group>
    </v-list>
    <div class="chat-add">
      <v-btn
        rounded="pill"
        color="primary"
        prepend-icon="mdi-plus"
        size="large"
        @click="room_add_mode = !room_add_mode"
      >
        トークルームを作成
      </v-btn>
    </div>
  </v-card>
  <ChatRoomCreate
    v-if="room_add_mode"
    :closeRoomCreate="closeRoomCreate"
  />
  <OverlayLoading v-if="params.loading" />
</template>

<script>
import ChatRoomCreate from './ChatRoomCreate.vue'
import OverlayLoading from '../../OverlayLoading.vue'

import storeAuth from '@/mixins/store/auth.js'

import { ref } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'

export default {
  components: { ChatRoomCreate, OverlayLoading },
  props: {
    changeMode: {
      type: Function
    },
    changeRoom: {
      type: Function
    }
  },

  setup(props) {
    const params = inject('params')
    const initChatRoom = inject('init-chat-room')
    const messageSet = inject('message-set')

    // const rooms = ref([])
    const group_rooms = ref([])
    const personal_rooms = ref([])
    const room_add_mode = ref(false);
    
    watch(
      () => params.rooms,
      () => {
        initRoomList()
      },
      { deep: true }
    )

    async function initRoomList() {
      group_rooms.value = params.rooms.filter(v =>
        v.room_type === 0 &&
        v.members.items.find(m => {
          return m.member_id === storeAuth.storeGetStaffId()
        })
      )
      personal_rooms.value = params.rooms.filter(v =>
        v.room_type === 1 &&
        v.members.items.find(m => {
          return m.member_id === storeAuth.storeGetStaffId()
        })
      )
    }
    initRoomList()

    const closeRoomCreate = async () => {
      room_add_mode.value = false
      messageSet('トークルームを作成しました', 'success')
      initChatRoom()
      props.changeMode("home");
    }

    const backFunc = () => {
      props.changeMode("home");
    };
    const moveRoom = (room) => {
      props.changeRoom(room);
    };
    
    return {
      params,
      backFunc,
      moveRoom,
      room_add_mode,
      closeRoomCreate,
      group_rooms,
      personal_rooms,
    };
  },
}
</script>

<style scoped>
.chat-list {
  border-right: 1px solid #ccc;
  height: calc(100vh - 48px);
  overflow: auto;
  position: sticky;
  top: 48px;
}
.chat-add {
  position: absolute;
  bottom: 24px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>