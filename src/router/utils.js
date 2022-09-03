import Auth from '@aws-amplify/auth'
import storeAuth from '@/mixins/store/auth.js'

export default {
  getAuthenticationedUser () {
    return Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        storeAuth.storeSetAuthUser(data)
        return data
      }
    }).catch((error) => {
      console.log(error)
      return null
    })
  }
}
