import store from '@/store/index.js'
export default {
  storeSetAuthUser (user) {
    store.commit('mSetCognitoUser', user)
  },
  storeSetAccount (account) {
    store.commit('mSetAccount', account)
  },
  storeSetSetupInfo (company, brand) {
    store.commit('mSetCompany', company)
    store.commit('mSetBrandCd', brand)
  },
  storeSetAssociate (associate) {
    store.commit('mSetAssociate', associate)
  },
  storeSetStaff (staff) {
    store.commit('mSetStaff', staff)
  },
  storeSetAssociateStaff (associate, staff) {
    console.log('store save associate', associate)
    console.log('store save staff', staff)
    store.commit('mSetAssociate', associate)
    store.commit('mSetStaff', staff)
  },
  storeResetUser () {
    store.commit('mResetUser')
  },
  storeSetCompanyGroupCd (company_group_cd) {
    store.commit('mSetCompanyGroupCd', company_group_cd)
  },
  storeSetCompanyCd (company_cd) {
    store.commit('mSetCompanyCd', company_cd)
  },
  storeSetBrandCd (brand) {
    store.commit('mSetBrandCd', brand)
  },
  storeSetStaffRole (staff_role) {
    store.commit('mSetStaffRole', staff_role.role_cd)
  },
  // 招待
  storeSetInvitationCode (invitation_cd) {
    store.commit('mSetInvitationCode', invitation_cd)
  },
  storeSetInvitationSendTo (send_to) {
    store.commit('mSetInvitationSendTo', send_to)
  },
  storeSetInvitationEmployeeId (invitation_employee_id) {
    store.commit('mSetInvitationEmployeeId', invitation_employee_id)
  },
  // 店舗招待
  storeSetInvitationShopCode (invitation_shop_cd) {
    store.commit('mSetInvitationShopCode', invitation_shop_cd)
  }
}
