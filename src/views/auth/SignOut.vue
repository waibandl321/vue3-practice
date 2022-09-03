<template>
  <Loading />
</template>

<script>
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'
import Loading from '@/components/common/OverlayLoading'
import storeAuth from '@/mixins/store/auth.js'

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
        await Auth.signOut()
        await storeAuth.storeResetUser()
        router.push('/auth/signin')
      } catch (error) {
        console.log('error signing out: ', error)
      }
    }
    signOut()
  }
}
</script>
