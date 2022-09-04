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
  // storeデータチェック用
  console.log('cognito', store.getters.cognitoUser)
  console.log('store account', {
    account_id: store.getters.accountId,
    staff_id: store.getters.staffId,
    associate_id: store.getters.associateId,
    company_cd: store.getters.companyCd,
    company_group_cd: store.getters.companyGroupCd,
    brand_cd: store.getters.brandCd,
    staff_role_cd: store.getters.staffRoleCd
  })

  const user = await Utils.getAuthenticationedUser()
  if (to.path.includes('auth/signin') && to.path.includes('auth/signup') && user) {
    return next({
      name: 'home'
    })
  }
  if (!to.path.includes('auth/signin') && !to.path.includes('auth/signup') && !user) {
    window.location = '/auth/signin'
    return
  }
  if (!to.path.includes('setup/') && !to.path.includes('auth/signout')) {
    if (store.getters.accountId) {
      // exist account
      if (!store.getters.staffId) {
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
