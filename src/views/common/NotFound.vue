<template>
  <AppHeader />
  <v-main>
    <v-container>
      <v-card-text>
        指定されたページは存在しません。
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          to="/"
        >TOPへ戻る</v-btn>
      </v-card-actions>
    </v-container>
  </v-main>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue'
export default {
  components: {
    AppHeader
  },
  setup() {
    
  },
}
</script>