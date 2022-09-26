<template>
  <OverlayLoading />
</template>
<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue';
import shopApiFunc from '@/mixins/api/master/shop.js'
import { useRouter } from 'vue-router';
import storeAuth from '@/mixins/store/auth';

export default {
  name: "invite-procedure",
  components: { OverlayLoading },
  setup () {
    const router = useRouter()
    const createShopStaff = async () => {
      try {
        await shopApiFunc.apiCreateShopStaff()
        storeAuth.storeSetInvitationShopCode(null)
        alert('店舗スタッフを追加しました。')
        router.push({
          name: 'home'
        })
      } catch (error) {
        console.error(error)
        alert('店舗招待に失敗しました。')
        router.push({
          name: 'master-shop'
        })
      }
    }
    createShopStaff()
  }
}
</script>