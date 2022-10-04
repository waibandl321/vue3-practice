import Home from '@/views/Home.vue'
import ChatIndex from '@/views/common/ChatIndex.vue'
import FileIndex from '@/views/common/FileIndex.vue'
import ForumIndex from '@/views/common/ForumIndex.vue'
import NotificationIndex from '@/views/common/NotificationIndex.vue'
import NotFoundComponent from '@/views/common/NotFound.vue'

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundComponent
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'ホーム' }
  },
  {
    name: 'notification-index',
    path: '/notification',
    component: NotificationIndex,
    meta: { title: '通知' }
  },
  {
    name: 'chat-view',
    path: '/chat',
    component: ChatIndex,
    meta: { title: 'チャット' }
  },
  {
    name: 'forum-index',
    path: '/forum',
    component: ForumIndex,
    meta: { title: '掲示板' }
  },
  {
    name: 'file-index',
    path: '/file',
    component: FileIndex,
    meta: { title: 'ファイル管理' }
  },
]
