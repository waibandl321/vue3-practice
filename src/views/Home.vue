<template>
  <v-container>
    <Header />
    <v-main>
      <v-list>
        <v-list-item
          v-for="(test, index) in tests"
          :key="index"
          :to="test.to"
          link
        >
          <v-list-item-title>{{ test.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card>
        {{ userAttr }}
      </v-card>
      <v-card>
        {{ cognitoUser }}
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import store from '@/store/index.js'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  setup () {
    const tests = [
      { key: 'amplify-tutorial', to: '/test/amplify-tutorial', text: '【テスト】Amplify チュートリアル' }
    ]
    const userAttr = {
      account_id: store.getters.accountId,
      staff_id: store.getters.staffId,
      associate_id: store.getters.associateId,
      company_cd: store.getters.companyCd,
      company_group_cd: store.getters.companyGroupCd,
      brand_cd: store.getters.brandCd
    }
    const cognitoUser = store.getters.cognitoUser
    // expose to template
    return {
      tests,
      userAttr,
      cognitoUser
    }
  }
}
</script>
