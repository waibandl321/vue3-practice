<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title>ユーザー新規作成</v-card-title>
      <SignUpInput
        v-if="mode == 'input'"
        :changeMode="changeMode"
        :params="params"
      />
      <SignUpCode
        v-if="mode == 'verify'"
        :initData="initData"
        :params="params"
      />
    </v-card>
  </v-container>
</template>

<script>
import SignUpInput from '@/components/auth/SignUpInput.vue'
import SignUpCode from '@/components/auth/SignUpCode.vue'
import { Hub } from 'aws-amplify'
import { useRouter } from 'vue-router'
import accountFunc from '@/mixins/api/account'
import storeAuth from '@/mixins/store/auth.js'

// TODO: 登録中の認証情報をstoreに保存する
export default {
  name: 'auth-signup',
  components: {
    SignUpInput,
    SignUpCode
  },
  data () {
    return {
      mode: 'input',
      params: {
        email: '',
        password: '',
        code: ''
      }
    }
  },
  setup () {
    // 自動ログイン
    const router = useRouter()
    const listenToAutoSignInEvent = () => {
      Hub.listen('auth', async ({ payload }) => {
        const { event } = payload
        if (event === 'autoSignIn') {
          const user = payload.data
          // assign user
          console.log('auto login', user)
          // アカウントDB作成
          await accountFunc.apiAccountCreate(user).then((account) => {
            storeAuth.storeSetAccount(account)
            storeAuth.storeSetAuthUser(user)
            router.push('/')
          })
        } else if (event === 'autoSignIn_failure') {
          router.push('/auth/signin')
        }
      })
    }
    listenToAutoSignInEvent()
  },
  methods: {
    changeMode (mode) {
      this.mode = mode
    },
    initData () {
      this.params.email = ''
      this.params.password = ''
      this.params.code = ''
    }
  }
}
</script>
