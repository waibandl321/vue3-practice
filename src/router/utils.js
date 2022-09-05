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
  },
  setInvitationCode (invitation_cd) {
    storeAuth.storeSetInvitationCode(invitation_cd)
  },
  setInvitationSendTo (send_to) {
    send_to = send_to.replace(' ', '+')
    storeAuth.storeSetInvitationSendTo(send_to)
  }
}
