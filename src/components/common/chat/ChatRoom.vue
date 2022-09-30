<template>
  <div class="chat-main">
    <!-- {{ params }} -->
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
    <!-- ルーム設定 -->
    <v-card-actions class="chat-room-head">
      <v-card-title>{{ params.room_viewer.room_name }}</v-card-title>
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
            v-if="judgeRoomOwner(params.room_viewer.owner_staff_id)"
            density="compact"
            link
            @click="roomEdit()"
          >
            トークルーム編集
          </v-list-item>
          <v-list-item
            v-if="judgeRoomOwner(params.room_viewer.owner_staff_id)"
            density="compact"
            link
            @click="deleteChatRoom()"
          >
            トークルームを削除
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
    <!-- メッセージリスト -->
    <div class="chat-messages">
      <v-progress-linear
        v-if="message_loading"
        indeterminate
        color="green"
      ></v-progress-linear>
      <v-list
        v-for="(group, g) in chat_messages"
        :key="g"
      >
        <v-list-subheader>【{{ group.date }}】</v-list-subheader>
        <v-list-item
          v-for="(message, m) in group.messages"
          :key="m"            
          prepend-icon="mdi-account"
          :subtitle="posterStaffName(message.poster_ids)"
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
                @click="deleteChatMessage(message)"
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
              @click="file_select_modal = true"
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
        <!-- <div>
          <DiscordPicker
            @emoji="setEmoji"
          />
        </div> -->
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
      <v-card-item>
        <span>添付画像:</span>
        <v-chip
          v-for="(file, f) in message.files"
          :key="f"
          class="ml-2"
        >{{ file.name ?? file.file_name }}</v-chip>
      </v-card-item>
      <!-- URL -->
      <v-card-item
        v-for="url in message.urls"
        :key="url.id"
      >
        <a
          :href="url.url_value"
          target="_blank"
          rel="noopener noreferrer"
        >{{ url.url_key }}</a>
      </v-card-item>
    </v-card>
  </div>
  <!-- input file 擬似要素 -->
  <v-file-input
    ref="triggerFile"
    class="d-none"
    @change="changeAttachment"
  ></v-file-input>
  <!-- ファイル管理から選択 -->
  <v-dialog v-model="file_select_modal">
    <FileSelectModal
      :isSelectedFile="isSelectedFile"
      :closeFileSelectModal="closeFileSelectModal"
    />
  </v-dialog>
  <!-- メンバー -->
  <v-dialog v-model="member_modal">
    <ChatMemberSelect
      :closeMemberModal="closeMemberModal"
    />
  </v-dialog>
  <!-- ルーム編集 -->
  <v-dialog v-model="chat_room_edit">
    <ChatRoomEdit 
      :closeRoomEdit="closeRoomEdit"
    />
  </v-dialog>
  <OverlayLoading v-if="params.loading" />
</template>

<script>
import OverlayLoading from '../OverlayLoading.vue'
import AppAlert from '@/components/common/AppAlert.vue';
import FileSelectModal from '../modal/FileSelectModal'
import ChatRoomEdit from './room/ChatRoomEdit.vue'
import ChatMemberSelect from './member/ChatMemberSelect.vue'
// import DiscordPicker from 'vue3-discordpicker'

import { ref, reactive } from '@vue/reactivity'
import { inject, watch } from '@vue/runtime-core'
import _ from 'lodash'

import chatMixin from './chat_mixin'
import chatApiFunc from '@/mixins/api/func/chat'
import utilMixin from '@/mixins/utils/utils.js'
import storeAuth from '@/mixins/store/auth.js'

export default {
  components: {
    FileSelectModal,
    AppAlert,
    OverlayLoading,
    ChatRoomEdit,
    ChatMemberSelect,
    // DiscordPicker
  },
  props: {
    changeMode: {
      type: Function
    },
    refreshRoomList: {
      type: Function
    }
  },
  setup(props) {
    const params = inject('params')
    const initChatRoom = inject('init-chat-room')
    const messageSet = inject('message-set')
    
    const room_members = params.room_viewer.members.items
    
    // トークルーム変更時のメッセージ読み込み
    watch(
      () => params.room_viewer,
      () => {
        resetMessage()
        getChatMessages()
        updateLastAccess()
      },
      { deep: true }
    )

    // ルーム訪問履歴記録
    const updateLastAccess = async () => {
      try {
        const current_member = room_members.find(
          v => v.member_id === storeAuth.storeGetStaffId()
        )
        await chatApiFunc.updateChatMember(current_member, utilMixin.currentDateTime())
      } catch (error) {
        console.log(error);
      }
    }
    updateLastAccess()

    // 送信者名取得
    const posterStaffName = (staff_id) => {
      const employee = params.company_employees.find(v => v.staff_id === staff_id)
      return employee.last_name + employee.first_name;
    }

    // メッセージ一覧
    const chat_messages = ref([])
    const message_loading = ref(false)
    // 取得
    const getChatMessages = async () => {
      message_loading.value = true
      try {
        let results = await chatApiFunc.getMessages(params.room_viewer)
        // 日付グルーピング
        if(results.length > 0) {
          results = reduceArrayGroupDate(results)
          results = sortMessagesByDate(results)
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
      // 日付順、時間順にソート
      function sortMessagesByDate (results) {
        // MEMO: ネストすると可読性が下がるのでメッセージのソートは分割
        const groups = results.sort(function (a, b) {
          return Number(a["date"].replace(/-/g, "")) - Number(b["date"].replace(/-/g, ""))
        });
        for (const group of groups) {
          group.messages.sort((ma, mb) => {
            const _ma = ma.createdAt.replace(/-/g, '').replace(/T/g, '').replace(/:/g, '').split('.')[0]
            const _mb = mb.createdAt.replace(/-/g, '').replace(/T/g, '').replace(/:/g, '').split('.')[0]
            return Number(_ma) - Number(_mb)
          })
        }
        return groups
      }
    }
    getChatMessages()

    // 画像遅延読み込み
    watch(
      () => chat_messages.value,
      async () => {
        chat_messages.value = await getChatFilePreview(chat_messages.value)
        scrollEnd()
        return;
      }
    )
    // スクロール
    function scrollEnd() {
      window.scrollTo(0, document.body.scrollHeight);
    }

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
    const judgeRoomOwner = (owner_staff_id) => {
      return storeAuth.storeGetStaffId() === owner_staff_id
    }
    const judgePoster = (poster_id) => {
      return storeAuth.storeGetStaffId() === poster_id
    }

    // トークルーム更新
    const chat_room_edit = ref(false)
    const roomEdit = () => {
      chat_room_edit.value = true
      params.room_editor = _.cloneDeep(params.room_viewer)
    }
    const closeRoomEdit = async (result = undefined, update = false) => {
      chat_room_edit.value = false
      if(result) {
        params.room_viewer = result
      }
      if(update) {
        props.refreshRoomList()
      }
    }

    // トークルーム削除
    const deleteChatRoom = async () => {
      if(!confirm('トークルームを削除するとメッセージも同時に削除されます。削除後は復元できません。よろしいですか？')) return;
      params.loading = true
      try {
        await chatApiFunc.deleteRoom(params.room_viewer)
        await _deleteMembers()
        await _deleteMessages()
        messageSet('チャットルームを削除しました', 'success')
        initChatRoom()
        props.changeMode('home')
      } catch (error) {
        messageSet(error, 'error')
        console.error(error);
      }
      params.loading = false

      async function _deleteMembers () {
        for (const member of room_members) {
          await chatApiFunc.deleteRoomMember(member) 
        }
      }
      async function _deleteMessages() {
        if(chat_messages.value.length === 0) return;
        for (const group of chat_messages.value) {
          for( const message of group.messages ) {
            deleteChatMessage(message)
          }
        }
      }
    }

    // メンバー
    const member_modal = ref(false)
    const closeMemberModal = () => {
      member_modal.value = false
    }

    // メッセージ削除
    const deleteChatMessage = async (message) => {
      console.log('delete message', message);
      params.loading = true
      try {
        await chatApiFunc.deleteChatMessage(message)
        await _deleteFiles(message)
        await _deleteUrls(message)
        chat_messages.value = afterDeleteMessageInit(message, chat_messages.value)
      } catch (error) {
        console.error(error);
      }
      params.loading = false

      async function _deleteFiles (message) {
        const files = message.files.items
        if(files.length === 0) return;
        for (const file of files) {
          await chatApiFunc.deleteChatFile(file)
        }
      }
      async function _deleteUrls (message) {
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
      url_obj.id = utilMixin.UUID_V4()
      message.urls.push(url_obj)
      url_setting.value = false
    }
    
    // 絵文字
    // const setEmoji = (emoji) => {
    //   message.text += emoji
    // }
    
    // 送信！
    const sendMessage = async () => {
      try {
        const post = await chatApiFunc.createChatMessage(params.room_viewer, message.text)
        // MEMO: 画像とURL保存を待っていると時間がかかるので先にメッセージだけ表示させる
        chat_messages.value.slice(-1)[0].messages.push(post)
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
            file_store = await chatMixin.mixinSaveChatFileDatabase(params.dir_top, file, file.data_url, "chat")
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
    // メッセージ初期化
    function resetMessage() {
      message.text = ""
      message.urls = []
      message.files = []
      url_obj.url_key = ""
      url_obj.url_value = ""
    }

    // ファイル関連
    const file_select_modal = ref(false);
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
      // ルーム編集
      chat_room_edit,
      roomEdit,
      closeRoomEdit,
      // ルームメンバー確認・追加
      member_modal,
      closeMemberModal,
      // ルーム削除
      judgeRoomOwner,
      deleteChatRoom,
      // メッセージ取得
      message_loading,
      chat_messages,
      judgePoster,
      posterStaffName,
      // メッセージ送信
      message,
      file_select_modal,
      // setEmoji,
      sendMessage,
      // メッセージ削除
      deleteChatMessage,
      // URL
      url_obj,
      url_setting,
      setUrl,
      // ファイル管理から選択
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
.chat-room-head {
  position: sticky;
  z-index: 2;
  top: 48px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.chat-message {
  padding-top: 8px;
  padding-bottom: 8px;
}
.chat-post {
  padding: 8px 16px;
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