<template>
  <div class="chat-main">
    {{ view_room }}
    <!-- ルーム設定 -->
    <v-card-actions>
      <v-card-title>{{ view_room.room_name }}</v-card-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            icon="mdi-dots-horizontal"
            size="small"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item
            density="compact"
            link
            @click="member_modal = !member_modal"
          >
            メンバー
          </v-list-item>
          <v-list-item
            density="compact"
            link
            @click="chat_room_edit = !chat_room_edit"
          >
            トークルーム名を修正
          </v-list-item>
          <v-list-item
            density="compact"
            link
            @click="deleteChatRoom()"
          >
            トークルームを削除
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
    <v-divider></v-divider>
    <!-- メッセージリスト -->
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        title="John Leider"
        subtitle="昨日はおいしいご飯をご馳走になりまして、有難うございました！またご一緒させてください！"
        class="chat-message"
      >
      </v-list-item>
    </v-list>

    <!-- メッセージ送信 -->
    <div class="chat-post">
      <div class="d-flex">
        <v-menu location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-image"
              size="small"
              variant="text"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              title="お使いのコンピューターから選択"
              density="compact"
              @click="$refs.triggerFile.click()"
            ></v-list-item>
            <v-list-item
              link
              title="ファイル管理から選択"
              density="compact"
              @click="file_select_modal = !file_select_modal"
            ></v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          location="end"
          :close-on-content-click="false"
          v-model="url_setting"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-link-variant"
              size="small"
              variant="text"
            ></v-btn>
          </template>
          <v-card width="500">
            <v-card-title>WEBサイト追加</v-card-title>
            <v-card-item>
              <v-text-field
                v-model="url_obj.url_key"
                label="WEBサイト名"
                density="compact"
              ></v-text-field>
              <v-text-field
                v-model="url_obj.url_value"
                label="URL"
                density="compact"
              ></v-text-field>
            </v-card-item>
            <v-card-actions class="justify-end">
              <v-btn
                variant="outlined"
                @click="url_setting = false"
              >キャンセル</v-btn>
              <v-btn
                variant="flat"
                color="primary"
                @click="setUrl()"
              >保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <div class="d-flex align-end">
        <v-textarea
          v-model.trim="message.text"
          hide-details="auto"
          clearable
          no-resize
          rows="3"
        ></v-textarea>
        <v-btn
          :disabled="!message.text"
          icon="mdi-send"
          class="ml-2"
          variant="text"
          color="success"
          @click="sendMessage()"
        ></v-btn>
      </div>
      <!-- 添付画像 -->
      <div class="mt-2">
        <span>添付画像:</span>
        <v-chip
          v-for="(file, f) in message.files"
          :key="f"
          class="ml-2"
        >{{ file.name ?? file.file_name }}</v-chip>
      </div>
      <!-- URL -->
      <div
        v-for="url in message.urls"
        :key="url.id"
        class="mt-2"
      >
        <a
          :href="url.url_value"
          target="_blank"
          rel="noopener noreferrer"
        >{{ url.url_key }}</a>
      </div>
    </div>
  </div>

  <!-- input file 擬似要素 -->
  <v-file-input
    ref="triggerFile"
    class="d-none"
    @change="changeAttachment"
  ></v-file-input>

  <!-- ファイル管理から選択 -->
  <template v-if="file_select_modal">
    <FIleSelectModal
      :file-select-modal="file_select_modal"
      :dir-top="dir_top"
      :isSelectedFile="isSelectedFile"
      :closeFileSelectModal="closeFileSelectModal"
    />
  </template>

  <!-- メンバー確認、追加 -->
  <v-dialog v-model="member_modal">
    <v-card width="600">
      <v-card-title>メンバー</v-card-title>
      <v-card-item>
        <v-card-subtitle>メンバー</v-card-subtitle>
        <v-card
          v-for="(member, m) in current_members"
          :key="m"
          class="mx-auto"
          prepend-icon="mdi-account"
        >
          <template v-slot:subtitle>
            {{ getMemberName(member.member_id) }}
          </template>
          <!-- ルーム作成者の場合はボタン非表示 -->
          <template
            v-if="judgeOwner(member.member_id)"
            v-slot:append
          >
            <v-btn
              color="error"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="deleteMember(member)"
            ></v-btn>
          </template>
        </v-card>
      </v-card-item>
      <v-card-item class="mt-6">
        <v-card-subtitle>ユーザー</v-card-subtitle>
        <v-card
          v-for="(member, e) in selectable_members"
          :key="e"
          class="mx-auto"
          prepend-icon="mdi-account"
        >
          <template v-slot:subtitle>
            {{ member.last_name }}{{ member.first_name }}
          </template>
          <template v-slot:append>
            <v-checkbox
              v-model="is_selected_members"
              :value="member"
              hide-details="auto"
              color="primary"
            ></v-checkbox>
          </template>
        </v-card>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="member_modal = false"
        >キャンセル</v-btn>
        <v-btn
          variant="flat"
          color="primary"
          :disabled="is_selected_members.length === 0"
          @click="addMember()"
        >追加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- ルーム編集 -->
  <ChatRoomEdit 
    v-if="chat_room_edit"
    :closeEditRoom="closeEditRoom"
  />

  <!-- ローディング -->
  <OverlayLoading v-if="loading" />
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
import { inject, onBeforeMount } from '@vue/runtime-core'
import { uuid } from 'vue-uuid'

import FIleSelectModal from '../modal/FIleSelectModal.vue'
import fileApiFunc from '@/mixins/api/func/file'
import chatApiFunc from '@/mixins/api/func/chat'
import employeeApiFunc from '@/mixins/api/master/employee'

import OverlayLoading from '../OverlayLoading.vue'
import ChatRoomEdit from './room/ChatRoomEdit.vue'

export default {
  components: { FIleSelectModal, OverlayLoading, ChatRoomEdit },
  props: {
    changeMode: {
      type: Function
    }
  },
  setup(props) {
    const $params = inject('params')
    const initChatRoom = inject('init-chat-room')
    const loading = ref(false);
    // MEMO: let使用理由・・・ルーム更新時に再代入するため
    let view_room = ref({})

    view_room.value = $params.view_room

    // トークルーム削除
    const deleteChatRoom = async () => {
      loading.value = true
      try {
        await chatApiFunc.deleteRoom(view_room.value)
        for (const member of view_room.value.members.items) {
          await chatApiFunc.deleteRoomMember(member)  
        }
        loading.value = false
        initChatRoom()
        alert('チャットルームを削除しました')
      } catch (error) {
        console.error(error);
      }
      loading.value = false
      props.changeMode('home')
    }
    // メンバー
    const member_modal = ref(false)
    const current_members = ref([])
    const company_employees = ref([])
    const selectable_members = ref([])
    const is_selected_members = ref([])

    const getMembers = async () => {
      current_members.value = view_room.value.members.items
      company_employees.value = await employeeApiFunc.apiGetEmployeeList()
      selectable_members.value = company_employees.value.filter((v) => {
        return !current_members.value.find(s => s.member_id === v.staff_id)
      })
    }
    getMembers()
    const getMemberName = (staff_id) => {
      const result = company_employees.value.find(v => v.staff_id === staff_id)
      return result ? result.last_name + result.first_name : ""
    }
    // ルーム作成者判定
    const judgeOwner = (staff_id) => {
      return view_room.value.owner_staff_id !== staff_id
    }
    // メンバー追加
    const addMember = async () => {
      loading.value = true
      member_modal.value = false
      try {
        for (const is_selected_member of is_selected_members.value) {
          const result = await chatApiFunc.addChatMember(view_room.value, is_selected_member)
          current_members.value.push(result)
          selectable_members.value = selectable_members.value.filter(v => v.staff_id !== result.member_id)
        }
        alert('メンバーを追加しました。')
      } catch (error) {
        console.error(error);
      }
      is_selected_members.value = []
      loading.value = false
    }

    // メンバー削除
    const deleteMember = async (member) => {
      if(!confirm('メンバーを削除します。よろしいですか？')) return;
      
      loading.value = true
      member_modal.value = false
      try {
        await chatApiFunc.deleteRoomMember(member)
        alert('メンバーを削除しました。')
        current_members.value = current_members.value.filter(v => v.member_id !== member.member_id)
        selectable_members.value = company_employees.value.filter((v) => {
          return !current_members.value.find(s => s.member_id === v.staff_id)
        })
      } catch (error) {
        console.error(error);
      }
      is_selected_members.value = []
      loading.value = false
    }

    // ルーム更新
    const chat_room_edit = ref(false)
    const closeEditRoom = async () => {
      // トークルーム情報再取得
      try {
        const result = await chatApiFunc.getRoomDetail(view_room.value)
        view_room.value = result.data.getChatRoom
      } catch (error) {
        console.error(error);
      }
    }

    // メッセージ送信
    const message = reactive({
      text: "",
      urls: [],
      files: []
    })
    let url_obj = reactive({
      url_key: "",
      url_value: ""
    })
    const url_setting = ref(false);
    const setUrl = () => {
      url_obj.id = uuid.v4()
      message.urls.push(url_obj)
      url_obj = {
        url_key: "",
        url_value: ""
      }
      url_setting.value = false
    }
    const file_select_modal = ref(false);
    // 送信処理
    const sendMessage = async () => {
      alert("click send");
    };
    // ファイル関連
    const dir_top = ref({})
    onBeforeMount(async () => {
      dir_top.value = await fileApiFunc.apiGetDirTop()
    })
    const changeAttachment = (event) => {
      message.files.push(...event.target.files)
    };
    const closeFileSelectModal = () => {
      file_select_modal.value = false
    }
    const isSelectedFile = (is_selected_file) => {
      message.files.push(is_selected_file)
      file_select_modal.value = false
    }

    return {
      view_room,
      loading,
      // ルーム編集
      chat_room_edit,
      closeEditRoom,
      // ルームメンバー確認・追加
      member_modal,
      selectable_members,
      current_members,
      is_selected_members,
      getMemberName,
      judgeOwner,
      addMember,
      deleteMember,
      // ルーム削除
      deleteChatRoom,
      
      // メッセージ送信
      message,
      file_select_modal,
      sendMessage,
      // URL
      url_obj,
      url_setting,
      setUrl,
      // ファイル管理から選択
      dir_top,
      changeAttachment,
      closeFileSelectModal,
      isSelectedFile,
    };
  }
}
</script>
<style scoped>
.chat-main {
  width: calc(100% - 300px);
}
.chat-message {
  padding-top: 8px;
  padding-bottom: 8px;
}
.chat-post {
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 300px;
  right: 0;
}
.chat-post >>> .v-input__append {
  align-items: flex-end;
}
</style>