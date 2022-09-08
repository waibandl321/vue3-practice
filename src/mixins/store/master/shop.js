import store from '@/store/index.js'
export default {
  // スタッフグループ従業員
  storeSetStaffGroupStaffs (staffs) {
    store.commit('mSetStaffGroupStaffs', staffs)
  },
  storeGetStaffGroupStaffs () {
    return store.getters.staffGroupStaffs
  },
  storeSetShopStaffs (shop_staffs) {
    store.commit('mSetShopStaffs', shop_staffs)
  },
  storeGetShopStaffs () {
    return store.getters.shopStaffs
  },
  storeWatchShopStaffs () {
    store.subscribe((mutation) => {
      if(mutation.type === "mSetShopStaffs") {
        return mutation.payload
      }
    }, { prepend: false })
  }
}