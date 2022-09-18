<template>
  <v-dialog v-model="room_add_mode">
    <v-card width="500">
      <v-card-title>トークルーム作成</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-text-field
          v-model.trim="room_obj.room_name"
          label="グループ名"
          hide-details="auto"
        ></v-text-field>
      </v-card-actions>
      <v-card-actions>

      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="room_add_mode = false"
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
import { ref } from '@vue/reactivity'
import chatApiFunc from '@/mixins/api/func/chat'

export default {
  setup() {
    const company_chat = ""
    // ルーム追加
    const room_add_mode = ref(false)
    const room_obj = ref({})
    const createChatRoom = async () => {
      try {
        await chatApiFunc.createRooom(room_obj.value, company_chat)
      } catch (error) {
        console.error(error);
      }
      room_add_mode.value = false
      room_obj.value = ""
    }
    return {
      // ルーム追加
      room_add_mode,
      room_obj,
      createChatRoom
    }
  },
}
</script>