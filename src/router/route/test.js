import Test from '@/views/test/TestIndex.vue'
import AmplifyTodo from '@/components/test/amplify/AmplifyTodo.vue'
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
      }
    ]
  }
]
