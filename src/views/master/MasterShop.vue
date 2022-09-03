<template>
  <Header />
  <v-main>
    <ShopList
      v-if="mode === 'list'"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ShopList from '@/components/master/shop/ShopList.vue'
export default {
  name: 'master-shop',
  components: {
    Header,
    ShopList
  },
  data () {
    return {
      mode: 'list'
    }
  }
}
</script>
