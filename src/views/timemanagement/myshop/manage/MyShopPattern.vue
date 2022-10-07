<template>
  <TimngHeader />
  <v-main >
    <MyShopBreadcrumb />
    My店舗 業務パターン
  </v-main>
</template>

<script>
  import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import MyShopBreadcrumb from '../MyShopBreadcrumb.vue';
  export default {
    components: {
    TimngHeader,
    MyShopBreadcrumb
},
    setup() {
      
    },
  }
  </script>