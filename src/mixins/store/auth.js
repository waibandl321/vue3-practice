import store from '@/store/index.js'
export default {
  storeSetAuthUser (user) {
    store.commit('mSetCognitoUser', user)
  },
  storeGetCognitoUser () {
    return store.getters.cognitoUser
  },
  storeSetAccount (account) {
    store.commit('mSetAccount', account)
  },
  storeGetAccount () {
    return store.getters.account
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
  storeGetStaffId () {
    return store.state.staff.staff_id
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
  storeGetCompanyCd () {
    return store.getters.companyCd
  },
  // 招待
  storeSetInvitationCode (invitation_cd) {
    store.commit('mSetInvitationCode', invitation_cd)
  },
  storeGetInvitationCode () {
    return store.getters.invitationCd
  },
  storeSetInvitationSendTo (send_to) {
    store.commit('mSetInvitationSendTo', send_to)
  },
  storeSetInvitationEmployeeId (invitation_employee_id) {
    store.commit('mSetInvitationEmployeeId', invitation_employee_id)
  },
  storeGetInvitationShopCode () {
    return store.getters.invitationShopCode
  },
  // 店舗招待
  storeSetInvitationShopCode (invitation_shop_cd) {
    store.commit('mSetInvitationShopCode', invitation_shop_cd)
  },
  // 店舗
  
  // スタッフグループ従業員
  storeSetStaffGroupStaffs (staffs) {
    store.commit('mSetStaffGroupStaffs', staffs)
  },
  storeGetStaffGroupStaffs () {
    return store.getters.staffGroupStaffs
  }
}
