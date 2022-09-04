import Test from '@/views/test/TestIndex.vue'
import AmplifyTodo from '@/components/test/amplify/AmplifyTodo.vue'
import InvitationTest from '@/components/test/invitation/InvitationList.vue'
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
      }
    ]
  }
]
