<template>
  <Header />
  <v-main>
    <ServiceList />
  </v-main>
</template>
<script>
import Header from '@/components/common/PcHeader.vue'
import ServiceList from '@/components/setting/service/ServiceList.vue'
export default {
  name: 'setting-services',
  components: {
    Header,
    ServiceList
  }
}
</script>
