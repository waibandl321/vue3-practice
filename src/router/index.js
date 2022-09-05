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
  if (to.path.includes('auth/signin') && to.path.includes('auth/signup') && user) {
    return next({
      name: 'home'
    })
  }
  if (!to.path.includes('auth/signin') && !to.path.includes('auth/signup') && !user) {
    if (to.query.ivc) {
      Utils.setInvitationCode(to.query.ivc)
      Utils.setInvitationSendTo(to.query.to)
      return next({
        name: 'auth-signup'
      })
    }
    return next({
      name: 'auth-signin'
    })
  }
  if (!to.path.includes('setup/') && !to.path.includes('auth/signout')) {
    if (store.getters.account) {
      // exist account
      if (!store.getters.staff.staff_id && store.getters.invitationCd) {
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
