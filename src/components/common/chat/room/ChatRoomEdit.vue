<template>
  <v-dialog v-model="modal">
    <v-card width="500">
      <v-card-title>トークルーム名を修正</v-card-title>
      <v-divider></v-divider>
      {{ view_room.room_name }}
      <v-card-item class="mt-6">
        <v-text-field
          v-model.trim="new_room_name"
          label="トークルーム名"
          hide-details="auto"
        ></v-text-field>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="modal = false"
        >キャンセル</v-btn>
        <v-btn
          variant="flat"
          color="primary"
          :disabled="!new_room_name"
          @click="updateChatRoom()"
        >追加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <OverlayLoading v-if="loading" />
</template>
<script>
import { ref } from '@vue/reactivity'
import chatApiFunc from '@/mixins/api/func/chat'
import { inject } from '@vue/runtime-core'
import OverlayLoading from '../../OverlayLoading.vue'

export default {
  components: { OverlayLoading },
  props: {
    closeEditRoom: {
      type: Function
    }
  },
  setup(props) {
    const loading = ref(false);
    const $params = inject("params");
    const initChatRoom = inject("init-chat-room");
    const view_room = $params.view_room;
    const modal = ref(true);
    // ルーム追加
    const new_room_name = ref(view_room.room_name)
    const updateChatRoom = async () => {
      modal.value = false;
      loading.value = true;
      try {
        await chatApiFunc.updateRoom(view_room, new_room_name.value);
        alert("トークルーム名を更新しました");
      }
      catch (error) {
        console.error(error);
      }
      loading.value = false;
      props.closeEditRoom()
      initChatRoom();
    };
    return {
      modal,
      loading,
      view_room,
      // ルーム追加
      new_room_name,
      updateChatRoom,
    };
  },
}
</script>