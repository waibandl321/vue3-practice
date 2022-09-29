<template>
  <v-dialog v-model="modal">
    <v-card width="500">
      <v-card-title>トークルーム名を修正</v-card-title>
      <v-divider></v-divider>
      <v-card-item class="mt-4">
        <v-card-subtitle>トークルーム名</v-card-subtitle>
        <v-text-field
          v-model.trim="view_room.room_name"
          hide-details="auto"
        ></v-text-field>
      </v-card-item>
      <v-card-item class="mt-6">
        <v-card-subtitle>通知設定</v-card-subtitle>
        <v-checkbox
          v-model="view_room.send_notice"
          label="チャットを受け取ったらお知らせで通知する"
          color="primary"
        ></v-checkbox>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="close()"
        >キャンセル</v-btn>
        <v-btn
          variant="flat"
          color="primary"
          :disabled="!view_room.room_name"
          @click="updateChatRoom()"
        >更新</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <OverlayLoading v-if="loading" />
</template>

<script>
import OverlayLoading from '../../OverlayLoading.vue'

import { reactive, ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
import _ from 'lodash'

import chatApiFunc from '@/mixins/api/func/chat'

export default {
  components: { OverlayLoading },
  props: {
    closeEditRoom: {
      type: Function
    }
  },
  setup(props) {
    const params = inject("params");
    // const initChatRoom = inject("init-chat-room");
    const messageSet = inject('message-set')

    const modal = ref(true);
    const loading = ref(false);

    const view_room = reactive(
      _.cloneDeep(params.view_room)
    )
    view_room.send_notice = view_room.send_notice === 0 ? true : false
    
    // ルーム更新
    const updateChatRoom = async () => {
      const update_flag = true
      modal.value = false;
      loading.value = true;
      try {
        const result = await chatApiFunc.updateRoom(view_room);
        messageSet("トークルームを更新しました", 'success');
        props.closeEditRoom(result.data.updateChatRoom, update_flag)
      }
      catch (error) {
        messageSet(error, 'error');
        console.error(error);
      }
      loading.value = false;
    };

    const close = () => {
      const update_flag = false
      const update_item = undefined
      modal.value = false;
      props.closeEditRoom(update_item, update_flag)
    }

    return {
      modal,
      loading,
      view_room,
      updateChatRoom,
      close
    };
  },
}
</script>