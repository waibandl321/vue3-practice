import Signin from '@/views/auth/Signin.vue'
import Signup from '@/views/auth/Signup.vue'
import SignOut from '@/views/auth/SignOut.vue'
export default [
  {
    path: '/auth/signin',
    name: 'auth-signin',
    component: Signin,
    meta: { title: 'サインイン' }
  },
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: Signup,
    meta: { title: 'サインアップ' }
  },
  {
    path: '/auth/signout',
    name: 'auth-signout',
    component: SignOut,
    meta: { title: 'サインアウト' }
  }
]
