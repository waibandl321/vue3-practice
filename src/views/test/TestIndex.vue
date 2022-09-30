<template>
  <Header />
  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
export default {
  components: {
    Header
  }
}
</script>
