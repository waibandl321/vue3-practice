<template>
  <Header />
  <v-main>
    <AccountDetail />
  </v-main>
</template>
<script>
import Header from '@/components/common/PcHeader.vue'
import AccountDetail from '@/components/setting/account/AccountDetail.vue'
export default {
  name: 'setting-account',
  components: {
    Header,
    AccountDetail
  }
}
</script>
