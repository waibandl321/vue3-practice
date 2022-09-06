<template>
  <OverlayLoading />
</template>
<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue';
import shopApiFunc from '@/mixins/api/master/shop.js'
import { useRouter } from 'vue-router';
import storeAuth from '@/mixins/store/auth';

export default {
  name: "shop-invite-procedure",
  components: { OverlayLoading },
  setup () {
    const router = useRouter()
    const createShopStaff = async () => {
      const err = await shopApiFunc.apiCreateShopStaff()
      if(!err) {
        storeAuth.storeSetInvitationShopCode(null)
        router.push({
          name: 'home'
        })
        return
      }
      router.push({
        name: 'master-shop'
      })
    }
    createShopStaff()
  }
}
</script>
type ShopStaff @model {
  id: ID!
  shop_staff_id: String
  shop_cd: String
  staff_id: String
  status: Int
  delete: Int
}