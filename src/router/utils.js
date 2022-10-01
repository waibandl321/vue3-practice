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
      storeAuth.storeResetUser()
      return null
    })
  },
  // 従業員招待
  setInvitationCode (invitation_cd) {
    storeAuth.storeSetInvitationCode(invitation_cd)
  },
  setInvitationEmployeeId (invitation_employee_id) {
    storeAuth.storeSetInvitationEmployeeId(invitation_employee_id)
  },
  // 店舗招待
  setInvitationShopCd (invitation_shop_cd) {
    storeAuth.storeSetInvitationShopCode(invitation_shop_cd)
  }
}
