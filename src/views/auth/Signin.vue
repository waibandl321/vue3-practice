<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title>サインイン</v-card-title>
      <v-alert
        v-if="error"
        color="error"
        class="mb-4"
      >
        {{ error }}
      </v-alert>
      <v-text-field
        v-model="auth.email"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="auth.password"
        label="Password"
      ></v-text-field>
      <div>
        <v-btn
          :loading="loading"
          :disabled="!auth.email || !auth.password"
          color="success"
          size="large"
          @click="signIn()"
        >
          サインイン
        </v-btn>
      </div>
      <div class="mt-10">
        <v-btn to="signup">ユーザー新規作成</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'
import storeAuth from '@/mixins/store/auth.js'
import accountFunc from '@/mixins/api/account.js'

export default {
  data () {
    return {
      loading: false,
      error: '',
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signIn () {
      this.loading = true
      this.error = ''
      try {
        const user = await Auth.signIn(this.auth.email, this.auth.password)
        if (user) {
          storeAuth.storeSetAuthUser(user)
          this.afterSigninMove(user)
        }
      } catch (error) {
        console.log('error signing in', error)
        this.error = error
      }
      this.loading = false
    },
    async afterSigninMove (user) {
      let account = await accountFunc.getAccount(user)
      account = account.data.listAccountss.items[0]
      storeAuth.storeSetAccount(account)

      let associate = await accountFunc.getAssociate(account)
      associate = associate.data.listAssociates.items
      this.storeSetAssociate(associate)

      if (associate.length === 1) {
        console.log('associate', ...associate)
        let staff = await accountFunc.getStaff(...associate)
        staff = staff.data.listStaffs.items
        if (staff.length === 1) {
          console.log('staff', staff)
          // MEMO: staffとassociateは同時生成なので、一旦条件なしで進める
          this.$router.push('/')
        }
      } else {
        // アソシエイトなし
        this.$router.push('/setup/welcome')
      }
    }
  }
}
</script>
