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
          >
            メンバー
          </v-list-item>
          <v-list-item
            density="compact"
            link
          >
            グループ名を修正
          </v-list-item>
          <v-list-item
            density="compact"
            link
          >
            グループを削除
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
          v-model="menu_link"
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
                label="WEBサイト名"
                density="compact"
              ></v-text-field>
              <v-text-field
                label="URL"
                density="compact"
              ></v-text-field>
            </v-card-item>
            <v-card-actions class="justify-end">
              <v-btn
                variant="outlined"
                @click="menu_link = false"
              >キャンセル</v-btn>
              <v-btn
                variant="flat"
                color="primary"
                @click="menu_link = false"
              >保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <div class="d-flex align-end">
        <v-textarea
          hide-details="auto"
          clearable
          no-resize
          rows="3"
          @click:append="clickSendMessage()"
        ></v-textarea>
        <v-btn
          icon="mdi-send"
          class="ml-2"
          variant="text"
          color="success"
        ></v-btn>
      </div>
    </div>
  </div>
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
  <!-- ローディング -->
  <OverlayLoading v-if="loading" />
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, inject } from '@vue/runtime-core'
import FIleSelectModal from '../modal/FIleSelectModal.vue'
import fileApiFunc from '@/mixins/api/func/file'
import OverlayLoading from '../OverlayLoading.vue'

export default {
  components: { FIleSelectModal, OverlayLoading },
  props: {
    changeMode: {
      type: Function
    }
  },
  setup() {
    const $params = inject('params')
    const view_room = $params.view_room

    const loading = ref(false);
    // URL
    const menu_link = ref(false);
    // const add_links = ref([])
    // ファイル関連
    const file_select_modal = ref(false);
    // const add_files = ref([])
    const dir_top = ref({})
    onMounted(async () => {
      dir_top.value = await fileApiFunc.apiGetDirTop()
    })
    const changeAttachment = (event) => {
      console.log(...event.target.files);
    };
    const closeFileSelectModal = () => {
      file_select_modal.value = false
    }
    const isSelectedFile = (file) => {
      console.log(file);
      file_select_modal.value = false
    }
    // メッセージ送信
    const clickSendMessage = () => {
      alert("click send");
    };

    return {
      view_room,
      loading,
      // URL
      menu_link,
      // ファイル管理から選択
      file_select_modal,
      dir_top,
      changeAttachment,
      closeFileSelectModal,
      isSelectedFile,
      // 送信
      clickSendMessage,
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