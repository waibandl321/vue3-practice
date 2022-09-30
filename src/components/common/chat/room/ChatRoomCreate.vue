<template>
  <v-dialog v-model="modal">
    <v-card width="500">
      <v-card-title>トークルーム作成</v-card-title>
      <v-divider></v-divider>
      <v-card-item>
        <v-card-subtitle>チャットタイプ</v-card-subtitle>
        <v-radio-group
          v-model="room_obj.room_type"
          hide-details="auto"
        >
          <v-radio
            v-for="(type, index) in chat_type"
            :key="index"
            :label="type.text"
            :value="type.value"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item class="mt-6">
        <v-card-subtitle>ルーム名</v-card-subtitle>
        <v-text-field
          v-model.trim="room_obj.room_name"
          label="グループ名"
          hide-details="auto"
        ></v-text-field>
      </v-card-item>
      <v-card-item class="mt-6">
        <v-card-subtitle>通知設定</v-card-subtitle>
        <v-checkbox
          v-model="room_obj.send_notice"
          label="チャットを受け取ったらお知らせで通知する"
          color="primary"
        ></v-checkbox>
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
          :disabled="!room_obj.room_name"
          @click="createChatRoom()"
        >追加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'

import apiFunc from '@/mixins/api/api.js'
import utilMixin from '@/mixins/utils/utils.js'

export default {
  props: {
    closeRoomCreate: {
      type: Function
    }
  },
  setup(props) {
    const params = inject('params')

    const modal = ref(true)
    const chat_type = [
      { value: 1, text: '個人' },
      { value: 0, text: 'グループ' },
    ]
    
    // ルーム追加
    const room_obj = reactive({
      room_name: "",
      room_type: 1,
      send_notice: false
    })
    const createChatRoom = async () => {
      modal.value = false
      params.loading = true
      try {
        const result = await apiFunc.apiChatRoomCreate(room_obj, params.company_chat)
        await apiFunc.apiCreateFirstChatRoomMember(result, utilMixin.currentDateTime())
      } catch (error) {
        console.error(error);
      }
      params.loading = false
      props.closeRoomCreate()
    }

    return {
      chat_type,
      modal,
      // ルーム追加
      room_obj,
      createChatRoom,
    }
  },
}
</script>