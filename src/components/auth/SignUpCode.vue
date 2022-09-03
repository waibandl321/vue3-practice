<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-alert
    v-if="success"
    color="success"
    class="mb-4"
  >
    {{ success }}
  </v-alert>
  <v-alert
    v-if="error"
    color="error"
    class="mb-4"
  >
    {{ error }}
  </v-alert>
  <v-text-field
    v-model="params.code"
    label="6桁の認証コード"
  ></v-text-field>
  <div>
    <v-btn
      :loading="loading"
      :disabled="!params.code"
      color="success"
      size="large"
      @click="verify()"
    >
      ユーザー認証
    </v-btn>
  </div>
  <div>
    <v-btn @click="resendConfirmationCode()">認証コード再発行</v-btn>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  props: {
    params: Object,
    initData: Function
  },
  data () {
    return {
      error: '',
      success: '',
      loading: false
    }
  },
  methods: {
    async verify () {
      this.loading = true
      try {
        // eslint-disable-next-line no-undef
        await Auth.confirmSignUp(this.params.email, this.params.code)
        this.initData()
      } catch (error) {
        console.log('error confirming sign up', error)
        this.error = error
      }
      this.loading = false
    },
    async resendConfirmationCode () {
      try {
        await Auth.resendSignUp(this.params.email)
        this.success = 'code resent successfully'
        console.log('code resent successfully')
      } catch (err) {
        console.log('error resending code: ', err)
        this.error = err
      }
    }
  }
}
</script>
