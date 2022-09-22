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
        トークルームを追加
      </v-btn>
    </div>
  </v-card>
  <ChatRoomCreate
    v-if="room_add_mode"
  />
</template>

<script>
import ChatRoomCreate from './ChatRoomCreate.vue'
import chatApiFunc from '@/mixins/api/func/chat'
import { ref } from '@vue/reactivity'

export default {
  components: { ChatRoomCreate },
  props: {
    changeMode: {
      type: Function
    },
    changeRoom: {
      type: Function
    }
  },
  

  setup(props) {
    const loading = ref(false)
    const rooms = ref([])
    const group_rooms = ref([])
    const personal_rooms = ref([])
    
    const init = async () => {
      loading.value = true
      try {
        rooms.value = await chatApiFunc.getCompanyChat().then(res => res.rooms.items)
        group_rooms.value = rooms.value.filter(v => v.room_type === 0)
        personal_rooms.value = rooms.value.filter(v => v.room_type === 1)
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    init()

    const backFunc = () => {
      props.changeMode("home");
    };
    const moveRoom = (room) => {
      props.changeRoom(room);
    };
    // ルーム作成関連
    const room_add_mode = ref(false);
    
    return {
      backFunc,
      moveRoom,
      room_add_mode,
      group_rooms,
      personal_rooms,
      init,
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