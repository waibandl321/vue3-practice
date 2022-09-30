<template>
  <v-card width="500">
    <v-card-title>トークルーム名を修正</v-card-title>
    <v-divider></v-divider>
    <v-card-item class="mt-4">
      <v-card-subtitle>トークルーム名</v-card-subtitle>
      <v-text-field
        v-model.trim="params.room_editor.room_name"
        hide-details="auto"
      ></v-text-field>
    </v-card-item>
    <v-card-item class="mt-6">
      <v-card-subtitle>通知設定</v-card-subtitle>
      <v-checkbox
        v-model="params.room_editor.send_notice"
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
        :disabled="!params.room_editor.room_name"
        @click="updateChatRoom()"
      >更新</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject } from '@vue/runtime-core'
import chatApiFunc from '@/mixins/api/func/chat'

export default {
  props: {
    closeRoomEdit: {
      type: Function
    }
  },
  setup(props) {
    const params = inject("params");
    const messageSet = inject('message-set')

    params.room_editor.send_notice = params.room_editor.send_notice === 0 ? true : false
    
    // ルーム更新
    const updateChatRoom = async () => {
      const update_flag = true
      params.loading = true;
      try {
        const result = await chatApiFunc.updateRoom(params.room_editor);
        messageSet("トークルームを更新しました", 'success');
        props.closeRoomEdit(result.data.updateChatRoom, update_flag)
      }
      catch (error) {
        messageSet(error, 'error');
        console.error(error);
      }
      params.loading = false;
    };

    const close = () => {
      const update_flag = false
      const update_item = undefined
      props.closeRoomEdit(update_item, update_flag)
    }

    return {
      params,
      updateChatRoom,
      close
    };
  },
}
</script>