<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-alert
    v-if="error"
    color="error"
    class="mb-4"
  >
    {{ error }}
  </v-alert>
  <v-text-field
    v-model="params.email"
    label="Email"
  ></v-text-field>
  <v-text-field
    v-model="params.password"
    label="Password"
  ></v-text-field>
  <div>
    <v-btn
      :loading="loading"
      :disabled="!params.email || !params.password"
      color="success"
      size="large"
      @click="signup()"
    >
      ユーザーを新規作成する
    </v-btn>
  </div>
  <div class="mt-10">
    <v-btn to="signin">サインイン</v-btn>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
// import storeAuth from '@/mixins/store/auth.js'
export default {
  name: 'auth-signup',
  props: {
    changeMode: Function,
    params: Object
  },
  data () {
    return {
      loading: false,
      error: ''
    }
  },
  methods: {
    async signup () {
      this.loading = true
      this.error = ''
      try {
        const { user } = await Auth.signUp({
          username: this.params.email,
          password: this.params.password,
          attributes: {
            email: this.params.email
          },
          // optional - enables auto sign in after user is confirmed
          autoSignIn: {
            enabled: true
          }
        })
        console.log(user)
        this.changeMode('verify')
      } catch (error) {
        console.log('error signing up:', error)
        this.error = error
      }
      this.loading = false
    }
  }
}
</script>
