<template>
  <div class="chat-main">
    {{ params.view_room }}
    <!-- ルーム設定 -->
    <v-card-actions>
      <v-card-title>{{ params.view_room.room_name }}</v-card-title>
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
    <div class="chat-messages">
      <v-progress-linear
        v-if="message_loading"
        indeterminate
        color="green"
      ></v-progress-linear>
      <template v-else>
        <v-list
          v-for="(group, g) in chat_messages"
          :key="g"
        >
          <v-list-subheader>【{{ group.date }}】</v-list-subheader>
          <v-list-item
            v-for="(message, m) in group.messages"
            :key="m"            
            prepend-icon="mdi-account"
            :subtitle="message.poster_ids"
            class="chat-message"
          >
            <!-- 削除同線 -->
            <v-menu
              v-if="judgePoster(message.poster_ids)"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  icon="mdi-dots-horizontal"
                  size="small"
                  class="chat-message-setting"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item
                  density="compact"
                  link
                  @click="deleteMessage(message)"
                >
                  メッセージを削除
                </v-list-item>
              </v-list>
            </v-menu>
            <v-list-item-title class="white-space-wrap">{{ message.post_text }}</v-list-item-title>
            <div v-if="message.files.items.length > 0">
              <v-img
                v-for="(file, i) in message.files.items"
                :key="i"
                :src="file.preview_src"
                width="150"
              ></v-img>
            </div>
            <div v-if="message.urls.items.length > 0">
              <div
                v-for="url in message.urls.items"
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
          </v-list-item>
        </v-list>
      </template>
    </div>

    <!-- メッセージ送信 -->
    <v-card class="chat-post" elevation="2">
      <div class="d-flex align-center">
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
        <div>
          <DiscordPicker 
            @emoji="setEmoji"
          />
        </div>
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
    </v-card>
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
  
  <!-- メンバー -->
  <ChatMemberSelect
    v-if="member_modal"
    :viewRoom="params.view_room"
    :closeMemberModal="closeMemberModal"
  />
  
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
import { inject, onBeforeMount, watch } from '@vue/runtime-core'
import { uuid } from 'vue-uuid'

import chatMixin from './chat_mixin'
import fileApiFunc from '@/mixins/api/func/file'
import chatApiFunc from '@/mixins/api/func/chat'
import utilMixin from '@/mixins/utils/utils.js'
import storeAuth from '@/mixins/store/auth.js'

import OverlayLoading from '../OverlayLoading.vue'
import FIleSelectModal from '../modal/FIleSelectModal.vue'
import ChatRoomEdit from './room/ChatRoomEdit.vue'
import ChatMemberSelect from './member/ChatMemberSelect.vue'
import DiscordPicker from 'vue3-discordpicker'

export default {
  components: {
    FIleSelectModal,
    OverlayLoading,
    ChatRoomEdit,
    ChatMemberSelect,
    DiscordPicker
  },
  props: {
    changeMode: {
      type: Function
    }
  },
  setup(props) {
    const initChatRoom = inject('init-chat-room')
    const params = inject('params')
    // トークルーム変更時のメッセージ読み込み
    watch(
      () => params.view_room,
      () => {
        resetMessage()
        getChatMessages()
      }
    )
    const loading = ref(false);
    
    // MEMO: ファイル選択用でディレクトリ情報事前読み込み
    const dir_top = ref({})
    onBeforeMount(async () => {
      dir_top.value = await fileApiFunc.apiGetDirTop()
    })

    // トークルーム削除
    const deleteChatRoom = async () => {
      try {
        await chatApiFunc.deleteRoom(params.view_room)
        for (const member of params.view_room.members.items) {
          await chatApiFunc.deleteRoomMember(member) 
        }
        alert('チャットルームを削除しました')
        initChatRoom()
      } catch (error) {
        console.error(error);
      }
      loading.value = false
      props.changeMode('home')
    }
    // メンバー
    const member_modal = ref(false)
    const closeMemberModal = () => {
      member_modal.value = false
    }

    // ルーム更新
    const chat_room_edit = ref(false)
    const closeEditRoom = async () => {
      // トークルーム情報再取得
      try {
        const result = await chatApiFunc.getRoomDetail(params.view_room)
        params.view_room = result.data.getChatRoom
      } catch (error) {
        console.error(error);
      }
    }
    // メッセージ取得
    const chat_messages = ref([])
    const message_loading = ref(false)
    // メッセージ一覧取得
    // TODO: 日付順にソート
    const getChatMessages = async () => {
      message_loading.value = true
      try {
        let results = await chatApiFunc.getMessages(params.view_room)
        // 日付グルーピング
        if(results.length > 0) {
          results = reduceArrayGroupDate(results)
        }
        chat_messages.value = results
      } catch (error) {
        console.error(error);
      }
      message_loading.value = false

      // 日付ごとに配列をグルーピング
      function reduceArrayGroupDate(results) {
        const groups = results.reduce((groups, message) => {
          const date = message.createdAt.split('T')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(message);
          return groups;
        }, {})
        return Object.keys(groups).map((date) => {
          return {
            date,
            messages: groups[date]
          };
        });
      }
      // 日付順にソート
      // function sortMessagesByDate () {}
    }
    getChatMessages()
    // 画像遅延読み込み
    watch(
      () => chat_messages.value,
      async () => {
        chat_messages.value = await getChatFilePreview(chat_messages.value)
        return;
      }
    )
    // ファイルプレビュー
    async function getChatFilePreview (groups) {
      for (const group of groups) {
        for( const message of group.messages ) {
          const files = message.files.items
          if(files.length > 0) {
            for (const file of files) {
              file.preview_src = await getPreviewerFile(file.data_url)
            }
          }
        }
      }
      return groups
      
      async function getPreviewerFile (data_url) {
        const requset_url = utilMixin.removeUrlQuery(data_url)
        return await utilMixin.getImageObjectURL(requset_url)
      }
    }
    // 削除スタッフ判定
    const judgePoster = (poster_id) => {
      return storeAuth.storeGetStaffId() === poster_id
    }
    // メッセージ削除
    const deleteMessage = async (message) => {
      if(!confirm('削除後は復元できません。よろしいですか？')) return
      loading.value = true
      try {
        await deleteMessage(message)
        await deleteFiles(message)
        await deleteUrls(message)
        chat_messages.value = afterDeleteMessageInit(message, chat_messages.value)
      } catch (error) {
        console.log(error);
      }
      loading.value = false

      async function deleteMessage (message) {
        await chatApiFunc.deleteChatMessage(message)
      }
      async function deleteFiles (message) {
        const files = message.files.items
        if(files.length === 0) return;
        for (const file of files) {
          await chatApiFunc.deleteChatFile(file)
        }
      }
      async function deleteUrls (message) {
        const urls = message.urls.items
        if(urls.length === 0) return;
        for (const url of urls) {
          await chatApiFunc.deleteChatUrl(url)
        }
      }
      function afterDeleteMessageInit (message, groups) {
        for (const group of groups) {
          group.messages = group.messages.filter(m => m.id !== message.id)
        }
        return groups
      }
    }
    // メッセージ送信
    let message = reactive({
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
      url_setting.value = false
    }
    const file_select_modal = ref(false);
    // 絵文字
    const setEmoji = (emoji) => {
      message.text += emoji
    }
    // 初期化
    function resetMessage() {
      message.text = ""
        message.urls = []
        message.files = []
        url_obj.url_key = ""
        url_obj.url_value = ""
    }
    // メッセージ送信
    const sendMessage = async () => {
      try {
        const post = await chatApiFunc.createChatMessage(params.view_room, message.text)
        await createChatFiles(post)
        await createChatUrls(post)
      } catch (error) {
        console.error(error);
      }
      getChatMessages()
      resetMessage()

      async function createChatFiles(post) {
        if(message.files.length === 0) return;
        for (const file of message.files) {
          let file_store = undefined
          if(!file.id) {
            file.data_url = await chatMixin.mixinUploadChatFile(file, "chat")
            file_store = await chatMixin.mixinSaveChatFileDatabase(dir_top.value, file, file.data_url, "chat")
          }
          await chatApiFunc.createChatFile(post, file, file_store)
        }
      }
      async function createChatUrls (post) {
        if(message.urls.length === 0) return
        for (const url of message.urls) {
          await chatApiFunc.createChatUrl(post, url)
        }
      }
    };
    // ファイル関連
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
      params,
      // view_room,
      loading,
      // ルーム編集
      chat_room_edit,
      closeEditRoom,
      // ルームメンバー確認・追加
      member_modal,
      closeMemberModal,
      // ルーム削除
      deleteChatRoom,
      // メッセージ取得
      getChatMessages,
      message_loading,
      chat_messages,
      judgePoster,
      // メッセージ送信
      message,
      file_select_modal,
      setEmoji,
      sendMessage,
      // メッセージ削除
      deleteMessage,
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
.chat-messages {
  padding-bottom: 250px;
}
.chat-message {
  padding-top: 8px;
  padding-bottom: 8px;
}
.chat-post {
  background: #fff;
  bottom: 0;
  position: fixed;
  padding: 8px 16px;
  left: 300px;
  overflow: visible;
  right: 0;
  z-index: 2;
}
.chat-post >>> .v-input__append {
  align-items: flex-end;
}
.chat-message-setting {
  position: absolute;
  right: 16px;
  top: 0;
}
.white-space-wrap {
  white-space: pre-wrap;
}
.chat-post >>> .vue3-emojipicker .mt-4 {
  margin-top: 0!important;
}
</style>