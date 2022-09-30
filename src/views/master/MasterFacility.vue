<template>
  <v-container>
    <Header />
    <v-main>
      <div>マスタ管理レフトナビ</div>
      <div>マスタ店舗設備</div>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
export default {
  name: 'master-facility',
  components: {
    Header
  },
  data () {
    return {
      mode: 'list'
    }
  }
}
</script>
