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
  }
}
