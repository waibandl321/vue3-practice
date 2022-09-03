<template>
  <v-container>
    <Header />
    <v-main>
      <div>ファイル管理</div>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
export default {
  name: 'file-view',
  components: {
    Header
  }
}
</script>
