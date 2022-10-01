import { createRouter, createWebHistory } from 'vue-router'
import CommonRoute from './route/common.js'
import TestRoute from './route/test.js'
import AuthRoute from './route/auth.js'
import MasterRoute from './route/master.js'
import SettingRoute from './route/setting.js'

import Utils from './utils.js'
import store from '@/store/index.js'

const routes = [
  ...CommonRoute,
  ...AuthRoute,
  ...MasterRoute,
  ...SettingRoute,
  ...TestRoute
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = await Utils.getAuthenticationedUser()
  // Cognitoログインユーザーが存在する場合はロップページに飛ばす
  if(user) {
    if (to.path.includes('auth/signin') && to.path.includes('auth/signup')) {
      return next({
        name: 'home'
      })
    }
    // 店舗招待
    if(to.query.ivs) {
      Utils.setInvitationShopCd(to.query.ivs)
      return next({
        name: 'master-shop'
      })
    }
  }
  // 認証以外へのルーティング制御
  if (!to.path.includes('auth/signin') && !to.path.includes('auth/signup') && !user) {
    // 招待コードあり
    if (to.query.ivc) {
      Utils.setInvitationCode(to.query.ivc)
      Utils.setInvitationEmployeeId(to.query.emp)
      return next({
        name: 'auth-signup'
      })
    }
    return next({
      name: 'auth-signin'
    })
  }
  // 初期設定完了の場合は遷移させない
  if(to.path.includes('setup')) {
    if(store.getters.staff) {
      return next({
        name: 'home'
      })
    }
  }
  // 初期設定とサインアウト以外のルーティングの場合 + 未登録の場合は初期設定画面に遷移
  if (!to.path.includes('setup/') && !to.path.includes('auth/signout')) {
    if (store.getters.account) {
      // exist account
      if (!store.getters.staff && store.getters.invitationCd) {
        // no staff
        return next({
          name: 'setup-welcome'
        })
      }
    }
  }
  next()
})

export default router
