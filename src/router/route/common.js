import Home from '@/views/Home.vue'
import ChatView from '@/views/common/ChatView.vue'
import FileView from '@/views/common/FileView.vue'
import ForumView from '@/views/common/ForumView.vue'
import NotificationView from '@/views/common/NotificationView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'ホーム' }
  },
  {
    name: 'notification-view',
    path: '/notification',
    component: NotificationView,
    meta: { title: '通知' }
  },
  {
    name: 'chat-view',
    path: '/chat',
    component: ChatView,
    meta: { title: 'チャット' }
  },
  {
    name: 'forum-view',
    path: '/forum',
    component: ForumView,
    meta: { title: '掲示板' }
  },
  {
    name: 'file-view',
    path: '/file',
    component: FileView,
    meta: { title: 'ファイル管理' }
  }
]
