<template>
  <TimngHeader />
  <v-main >
    <MyShopBreadcrumb />
    <v-row>
      <v-col cols="3">
        <DatePicker
          v-model="routine_date"
          is-expanded
          :min-date="new Date()"
          @dayclick="dayClick()"
        ></DatePicker>
      </v-col>
      <v-col cols="9">
        <v-list>
          <v-alert
          color="#2A3B4D"
          theme="dark"
          density="compact"
          >時間指定あり</v-alert>
          <template
            v-for="i of 2"
            :key="i"
          >
            <v-list-item
              rounded
              variant="elevated"
              class="mt-2"
            >
              <template v-slot:append="{ isActive }">
                <v-list-item-action start>
                  <v-btn
                    :model-value="isActive"
                    icon="mdi-feature-search-outline"
                    size="small"
                  ></v-btn>
                </v-list-item-action>
              </template>
              <v-list-item-title>12:00 テストタスク</v-list-item-title>
            </v-list-item>
            <!-- サブタスクあり -->
            <v-list-item
              rounded
              variant="elevated"
              class="subtask-card"
            >
              <template v-slot:append="{ isActive }">
                <v-list-item-action start>
                  <v-btn
                    :model-value="isActive"
                    icon="mdi-feature-search-outline"
                    size="small"
                  ></v-btn>
                </v-list-item-action>
              </template>
              <v-list-item-title>12:00 テストタスク</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
        <v-list>
          <v-alert
          color="#2A3B4D"
          theme="dark"
          density="compact"
          >時間指定なしのタスク</v-alert>
          <template
            v-for="i of 2"
            :key="i"
          >
            <v-list-item
              rounded
              variant="elevated"
              class="mt-2"
            >
              <template v-slot:append="{ isActive }">
                <v-list-item-action start>
                  <v-btn
                    :model-value="isActive"
                    icon="mdi-feature-search-outline"
                    size="small"
                  ></v-btn>
                </v-list-item-action>
              </template>
              <v-list-item-title>12:00 テストタスク</v-list-item-title>
            </v-list-item>
            <!-- サブタスクあり -->
            <v-list-item
              rounded
              variant="elevated"
              class="subtask-card"
            >
              <template v-slot:append="{ isActive }">
                <v-list-item-action start>
                  <v-btn
                    :model-value="isActive"
                    icon="mdi-feature-search-outline"
                    size="small"
                  ></v-btn>
                </v-list-item-action>
              </template>
              <v-list-item-title>12:00 テストタスク</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import MyShopBreadcrumb from '../MyShopBreadcrumb.vue';
import { DatePicker } from 'v-calendar';
import { ref } from '@vue/reactivity';
export default {
  components: {
    TimngHeader,
    MyShopBreadcrumb,
    DatePicker
},
  setup() {
    const routine_date = ref(new Date())
    const dayClick = () => {
      console.log(routine_date.value);
    }
    return {
      routine_date,
      dayClick
    }
  },
}
</script>
<style scoped>
.view-body {
  width: 100%;
}
.subtask-card {
  margin-left: 24px;
}
</style>