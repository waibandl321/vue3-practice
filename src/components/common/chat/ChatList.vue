<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    {{ personal_rooms }}
    <hr>
    {{ group_rooms }}
    <v-list>
      <v-list-item 
        prepend-icon="mdi-home"
        title="Home"
        link
        @click="backFunc()"
      ></v-list-item>
      <v-list-group 
        v-if="group_rooms"
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
        トークルームを追加
      </v-btn>
    </div>
  </v-card>
  <ChatRoomCreate
    v-if="room_add_mode"
  />
</template>

<script>
import ChatRoomCreate from './room/ChatRoomCreate.vue'

import { ref } from '@vue/reactivity'
import { computed, inject } from '@vue/runtime-core'

export default {
  props: {
    changeMode: Function
  },
  setup(props) {
    const $params = inject('params')
    const rooms = $params.company_chat.rooms.items
    const group_rooms = computed(() => rooms.filter(v => v.room_type === 0))
    const personal_rooms = computed(() => rooms.filter(v => v.room_type === 1))

    const backFunc = () => {
      props.changeMode("home");
    };
    const moveRoom = (room) => {
      props.changeMode("room", room);
    };
    // ルーム作成関連
    const room_add_mode = ref(false);
    
    return {
      backFunc,
      moveRoom,
      room_add_mode,
      group_rooms,
      personal_rooms
    };
  },
  components: { ChatRoomCreate }
}
</script>

<style scoped>
.chat-add {
  position: absolute;
  bottom: 24px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>