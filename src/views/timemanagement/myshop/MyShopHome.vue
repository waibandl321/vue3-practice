<template>
  <TimngHeader />
  <v-main >
    <div class="pa-4">
      <v-card class="pa-4">
        <v-card-title>通知</v-card-title>
        <v-card-item>
          <v-card-subtitle>2022/10/06 18:00</v-card-subtitle>   
          <v-card-content>テキストテキストテキストテキストテキストテキスト</v-card-content>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>2022/10/06 18:00</v-card-subtitle>   
          <v-card-content>テキストテキストテキストテキストテキストテキスト</v-card-content>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>2022/10/06 18:00</v-card-subtitle>   
          <v-card-content>テキストテキストテキストテキストテキストテキスト</v-card-content>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>2022/10/06 18:00</v-card-subtitle>   
          <v-card-content>テキストテキストテキストテキストテキストテキスト</v-card-content>
        </v-card-item>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="primary"
          >全ての通知を見る</v-btn>
        </v-card-actions>
      </v-card>
      <v-row class="mt-4">
        <v-col cols="5">
          <v-card>
            <v-card-title>カレンダー</v-card-title>
            <DatePicker
              v-model="routine_date"
              is-expanded
              :min-date="new Date()"
              @dayclick="dayClick()"
            ></DatePicker>
            {{ routine_date }}
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>My店舗 業務管理</v-card-title>
            <v-list>
              <v-list-item
                link
                v-for="(link, index) in myshop_routes"
                :key="index"
                :title="link.meta.title"
                :to="'/timemanagement/' + link.path"
              ></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { useRouter } from "vue-router"
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    DatePicker
  },
  setup() {
    const router = useRouter()
    
    const routine_date = ref(new Date())

    const myshop_routes = computed(() => {
      return router.options.routes
      .find(v => v.name === 'timng-index').children
      .filter(v => v.path.includes('myshop/manage'))
    })
    
    const dayClick = () => {
      // 遷移
      router.push({
        name: "myshop-calendar",
        params: {
          id: "454545"
        }
      })
    }
    return {
      myshop_routes,
      routine_date,
      dayClick
    }
  },
}
</script>