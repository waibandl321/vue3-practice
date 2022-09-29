<template>
  <v-container>
    <Header />
    <v-main>
      <v-card>
        <v-card-title>テスト機能</v-card-title>
        <v-list>
          <v-list-item
            v-for="(test, index) in test_routes"
            :key="index"
            :to="'/test/' + test.path"
            link
          >
            <v-list-item-title>{{ test.meta.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  setup () {
    const router = useRouter()
    const test_routes = router.options.routes.find(v => v.path.includes('test')).children;
    
    return {
      test_routes
    }
  }
}
</script>
