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
import storeAuth from '@/mixins/store/auth.js'
import apiFunc from '@/mixins/api/api.js'

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
    // MEMO: アカウント登録だけして離脱し、サインインしようとするとエラーになる
    async signIn () {
      this.loading = true
      this.error = ''
      try {
        const cognito_user = await apiFunc.apiEmailSignIn(this.auth.email, this.auth.password)
        if (cognito_user) {
          this.afterSigninMove(cognito_user)
        }
      } catch (error) {
        console.error(error)
        this.loading = false
        this.error = error
      }
    },
    async afterSigninMove (cognito_user) {
      try {
        const account = await apiFunc.apiGetAccount(cognito_user)
        const associate = account.associate.items[0]
        const staff = associate.staffs.items[0]
        const brands = await apiFunc.apiGetBrandsBySignin(staff.company_cd)
        
        storeAuth.storeSetAuthUser(cognito_user)
        storeAuth.storeSetAccount(account)
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetStaffRole(...staff.roles.items)
        storeAuth.storeSetCompanyCd(staff.company_cd)
        // MEMO :複数ブランドに所属している場合はどのブランドの従業員としてログインするか選択させる?
        // すき家に勤めているのに、なか卯の情報見れたらまずい？
        // 企業本部なら問題ない？
        storeAuth.storeSetBrands(brands)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>
