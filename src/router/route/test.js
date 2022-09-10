import Test from '@/views/test/TestIndex.vue'
import AmplifyTodo from '@/components/test/amplify/AmplifyTodo.vue'
import InvitationTest from '@/components/test/invitation/InvitationList.vue'
import LoginUserInfo from '@/components/test/login/UserInfo'
import InitChatForumFile from '@/components/test/functions/InitChatForumFile.vue'
import FileUpload from '@/components/test/file/FileUpload.vue'
export default [
  {
    path: '/test/',
    component: Test,
    children: [
      {
        path: 'amplify-tutorial',
        component: AmplifyTodo,
        name: 'amplify-tutorial',
        meta: { title: '【テスト】Amplityチュートリアル' }
      },
      {
        path: 'invitation-check',
        component: InvitationTest,
        name: 'invitation-check',
        meta: { title: '【テスト】招待確認' }
      },
      {
        path: 'login-user-info',
        component: LoginUserInfo,
        name: 'login-user-info',
        meta: { title: '【テスト】ログイン中ユーザーの詳細情報' }
      },
      {
        path: 'init-chat-forum-file',
        component: InitChatForumFile,
        name: 'init-chat-forum-file',
        meta: { title: '【テスト】初期データ登録 チャット、掲示板、ファイル管理' }
      },
      {
        path: 'file-upload',
        component: FileUpload,
        name: 'file-upload',
        meta: { title: '【テスト】ファイルアップロード' }
      }
    ]
  }
]
