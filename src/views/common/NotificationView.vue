<template>
  <v-container>
    <Header />
    <v-main>
      <div>通知</div>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
export default {
  name: 'notification-view',
  components: {
    Header
  }
}
</script>
