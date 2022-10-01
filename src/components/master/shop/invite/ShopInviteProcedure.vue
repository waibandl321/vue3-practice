<template>
  <OverlayLoading />
</template>

<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue';
import apiFunc from '@/mixins/api/api.js'
import storeAuth from '@/mixins/store/auth';
import { inject } from '@vue/runtime-core';

export default {
  name: "invite-procedure",
  components: { OverlayLoading },
  props: {
    changeMode: {
      type: Function
    },
  },
  setup (props) {
    const injFuncMessageSet = inject('message-set')
    const createShopStaff = async () => {
      try {
        await apiFunc.apiCreateShopStaff()
        storeAuth.storeSetInvitationShopCode(null)
        injFuncMessageSet('店舗スタッフを追加しました。', 'success')
        props.changeMode('list')
      } catch (error) {
        console.error(error)
        injFuncMessageSet('店舗招待に失敗しました。もう一度やり直してください。', 'error')
        props.changeMode('list')
      }
    }
    createShopStaff()
  }
}
</script>