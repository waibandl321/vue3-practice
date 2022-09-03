import SettingAccount from '@/views/setting/SettingAccount'
import SettingServices from '@/views/setting/SettingServices'

import SetupIndex from '@/views/setup/SetupIndex'
import SetupCompany from '@/components/setup/SetupCompany'
import SetupConfirm from '@/components/setup/SetupConfirm'
import SetupWelcome from '@/components/setup/SetupWelcome'
import SetupBrand from '@/components/setup/SetupBrand'
import SetupProfile from '@/components/setup/SetupProfile'

export default [
  {
    path: '/setting/services',
    name: 'setting-services',
    component: SettingServices,
    meta: { title: 'ポータル サービス' }
  },
  {
    path: '/setting/account',
    name: 'setting-account',
    component: SettingAccount,
    meta: { title: 'アカウント設定' }
  },
  {
    path: '/setup',
    name: 'setup-index',
    component: SetupIndex,
    children: [
      {
        path: 'welcome',
        name: 'setup-welcome',
        component: SetupWelcome,
        meta: { title: 'Welcome to Portal' }
      },
      {
        path: 'company',
        name: 'setup-company',
        component: SetupCompany,
        meta: { title: '【Setup】企業' }
      },
      {
        path: 'brand',
        name: 'setup-brand',
        component: SetupBrand,
        meta: { title: '【Setup】ブランド' }
      },
      {
        path: 'profile',
        name: 'setup-profile',
        component: SetupProfile,
        meta: { title: '【Setup】プロフィール' }
      },
      {
        path: 'confirm',
        name: 'setup-confirm',
        component: SetupConfirm,
        meta: { title: '【Setup】確認' }
      }
    ]
  }
]
