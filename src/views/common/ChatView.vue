<template>
  <v-container>
    <Header />
    <v-main>
      <div>チャット</div>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
export default {
  name: 'chat-view',
  components: {
    Header
  }
}
</script>
