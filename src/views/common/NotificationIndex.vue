<template>
  <v-container>
    <Header />
    <v-main>
      <!-- 絞り込み -->
      <v-select
        v-model="filter_category"
        :items="filter_options"
        item-title="category_name"
        item-value="category_key"
        hide-details="auto"
        label="絞り込み"
        color="primary"
        @change="filter"
      ></v-select>
      <!-- アイテム -->
      <v-card
        class="mt-4 pt-4"
        v-for="(item, index) in notifications"
        :key="index"
      >
        <v-card-subtitle>
          {{ item.createdAt }}
        </v-card-subtitle>
        <v-card-title>
          {{ item.post_title }}
        </v-card-title>
        <v-card-text>
          {{ item.post_text }}
        </v-card-text>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
import apiFunc from '@/mixins/api/api.js'
import { ref } from '@vue/reactivity'

export default {
  name: 'notification-index',
  components: {
    Header
  },
  setup () {
    const notifications = ref([])
    const getNotifications = async () => {
      notifications.value = await apiFunc.apiGetNotifications ()
    }
    getNotifications()


    const filter_category = ref(0)
    const filter_options = [
      { category_key: 0, category_name: "すべてのお知らせ" },
      { category_key: 1, category_name: "システム通知" },
      { category_key: 2, category_name: "運営会社からメッセージ" },
    ]

    const filter = () => {

    }
    
    return {
      notifications,
      filter_category,
      filter_options,
      filter
    }
  },
}
</script>
