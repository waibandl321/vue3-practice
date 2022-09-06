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
import accountApiFunc from '@/mixins/api/account.js'
import brandFunc from '@/mixins/api/master/brand.js'

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
        this.loading = false
        this.error = error
      }
    },
    async afterSigninMove (user) {
      try {
        const account = await accountApiFunc.getAccount(user)
        // TODO: アカウント登録だけして離脱し、サインインしようとするとエラーになる
        const associate = await accountApiFunc.getAssociate(account)
        const staff = await accountApiFunc.getStaff(associate)
        // TODO: staff roleもstoreに保存する必要がある
        const brand = await brandFunc._apiGetBrand(staff.company_cd)

        storeAuth.storeSetAccount(account)
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetCompanyCd(staff.company_cd)
        storeAuth.storeSetCompanyGroupCd(staff.company_group_cd)
        // TODO: 複数のブランドある場合どうするか
        storeAuth.storeSetBrandCd(...brand)

        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>
