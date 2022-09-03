<template>
  <v-container>
    <Header />
    <v-main>
      <div>掲示板</div>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
export default {
  name: 'forum-view',
  components: {
    Header
  }
}
</script>
