<template>
  <Loading />
</template>

<script>
import Loading from '@/components/common/OverlayLoading'

import storeAuth from '@/mixins/store/auth.js'
import apiFunc from '@/mixins/api/api.js'

import { useRouter } from 'vue-router'

export default {
  name: 'auth-signout',
  components: {
    Loading
  },
  setup () {
    const router = useRouter()
    const signOut = async () => {
      console.log('signout')
      try {
        await apiFunc.apiSignOut()
        storeAuth.storeResetUser()
        router.push('/auth/signin')
      } catch (error) {
        console.log('error signing out: ', error)
      }
    }
    signOut()
  }
}
</script>
