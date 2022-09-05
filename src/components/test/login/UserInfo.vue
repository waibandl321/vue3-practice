<template>
  <PcHeader />
  <v-main>
    <v-container>
      <div>ログイン中ユーザーの詳細情報</div>
      <v-card>
        <v-card-title>アカウント</v-card-title>
        <v-card-text>{{ account }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>アソシエイト</v-card-title>
        <v-card-text>{{ account }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>スタッフ</v-card-title>
        <v-card-text>{{ staff }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>スタッフロール</v-card-title>
        <v-card-text>{{ staff_role }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>所属企業</v-card-title>
        <v-card-text>{{ company }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>所属ブランド</v-card-title>
        <v-card-text>{{ brand }}</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>cognito</v-card-title>
        <v-card-text>{{ cognito }}</v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import PcHeader from '@/components/common/PcHeader.vue';
import store from '@/store/index.js'
export default {
  name: 'login-user-info',
  components: {
    PcHeader
  },
  setup () {
    const cognito = store.getters.cognitoUser
    const account = {
      account: store.getters.account
    }
    const staff = {
      staff: store.getters.staff,
    }
    const staff_role = {
      staff_role_cd: store.getters.staffRoleCd
    }
    const associate = {
      associate_id: store.getters.associateId,
    }

    const company = {
      company_cd: store.getters.companyCd,
      company_group_cd: store.getters.companyGroupCd,
    }

    const brand = {
      brand_cd: store.getters.brandCd,
    }

    return {
      cognito,
      account,
      staff,
      staff_role,
      associate,
      company,
      brand
    }
  }
}
</script>