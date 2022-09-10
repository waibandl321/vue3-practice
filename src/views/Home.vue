<template>
  <v-container>
    <Header />
    <v-main>
      <v-list>
        <v-list-item
          v-for="(test, index) in tests"
          :key="index"
          :to="test.to"
          link
        >
          <v-list-item-title>{{ test.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  setup () {
    const tests = [
      { key: 'amplify-tutorial', to: '/test/amplify-tutorial', text: '【テスト】Amplify チュートリアル' },
      { key: 'invitation-check', to: '/test/invitation-check', text: '【テスト】招待チェック' },
      { key: 'login-user-info', to: '/test/login-user-info', text: '【テスト】ログイン中ユーザーの詳細情報' },
      { key: 'init-chat-forum-file', to: '/test/init-chat-forum-file', text: '【テスト】初期データ登録 チャット、掲示板、ファイル管理' },
      { key: 'file-upload', to: '/test/file-upload', text: '【テスト】ファイルアップロード' },
    ]
    // expose to template
    return {
      tests
    }
  }
}
</script>
