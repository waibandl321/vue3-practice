import { API } from 'aws-amplify'
import { createShop, updateShop, createShopStaff, deleteShopStaff, createShopStaffGroup, 
  deleteShopStaffGroup, createShopStaffGroupStaff, updateShopStaffGroup, deleteShopStaffGroupStaff } from '@/graphql/mutations'
import { listShops, listShopStaffs, listShopStaffGroups, listShopStaffGroupStaffs, getShopStaff } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

export default {
  async apiCreateShop (shop) {
    const _shop = this.generateShopObject(shop)
    return await API.graphql({
      query: createShop,
      variables: { input: _shop }
    })
  },

  async apiUpdateShop (_shop) {
    const item = this.generateShopObject(_shop)
    item.id = _shop.id

    await API.graphql({
      query: updateShop,
      variables: { input: item }
    })
  },
  generateShopObject (shop) {
    return {
      company_shop_cd: shop.company_shop_cd ?? uuid.v4(),
      shop_cd: shop.shop_cd,
      address: shop.address,
      area_cd: shop.area_cd,
      brand_cd: shop.brand_cd,
      company_cd: store.getters.companyCd,
      shop_name_kana: shop.shop_name_kana,
      shop_name: shop.shop_name,
      phone: shop.phone,
      is_head: shop.is_head,
      status: 0,
      delete: 0
    }
  },

  async apiGetShops () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listShops,
      variables: { filter: filter }
    })
    return results.data.listShops.items
  },

  // 店舗スタッフ
  async apiCreateShopStaff () {
    const shop_staff = this.generateShopStaffObject()
    return await API.graphql({
      query: createShopStaff,
      variables: { input: shop_staff }
    })
  },
  generateShopStaffObject () {
    return {
      shop_staff_id: uuid.v4(),
      company_shop_cd: store.getters.invitationShopCode,
      staff_id: store.getters.staff.staff_id,
      status: 0,
      delete: 0
    }
  },
  async apiGetShopStaffList(company_shop_cd) {
    const filter = {
      company_shop_cd: {
        eq: company_shop_cd
      }
    }
    const results = await API.graphql({
      query: listShopStaffs,
      variables: { filter: filter }
    })
    return results.data.listShopStaffs.items
  },
  async getShopStaffDetail (shop_staff) {
    const result = await API.graphql({
      query: getShopStaff,
      variables: { id: shop_staff.id }
    })
    return result.data.getShopStaff
  },
  async apiDeleteShopStaff (id) {
    const filter = {
      id: id,
    }
    return await API.graphql({
      query: deleteShopStaff,
      variables: {input: filter}
    });
  },
  // スタッフグループ作成
  async apiCreateShopStaffGroup (shop, staff_group_name) {
    const shop_staff_group = this.generateCreateShopStaffObject(shop, staff_group_name)
    const result = await API.graphql({
      query: createShopStaffGroup,
      variables: { input: shop_staff_group }
    })
    return result.data.createShopStaffGroup
  },
  generateCreateShopStaffObject (shop, staff_group_name) {
    return {
      staff_group_cd: uuid.v4(),
      company_shop_cd: shop.company_shop_cd,
      group_name: staff_group_name,
      staff_id: store.getters.staff.staff_id
    }
  },
  // スタッフグループ更新
  async apiUpdateShopStaffGroup (shop, staff_group) {
    const item = this.generateUpdateShopStaffObject(shop, staff_group)

    return await API.graphql({
      query: updateShopStaffGroup,
      variables: { input: item }
    })
  },
  generateUpdateShopStaffObject (shop, staff_group) {
    return {
      id: staff_group.id,
      staff_group_cd: staff_group.staff_group_cd,
      company_shop_cd: shop.company_shop_cd,
      group_name: staff_group.group_name,
      // staff_id: store.getters.staff.staff_id
    }
  },
  // スタッフグループ取得
  async apiGetShopStaffGroup (shop) {
    const filter = {
      company_shop_cd: {
        eq: shop.company_shop_cd
      }
    }
    const results = await API.graphql({
      query: listShopStaffGroups,
      variables: { filter: filter }
    })
    return results.data.listShopStaffGroups.items
  },
  // スタッフグループ削除
  async apiDeleteShopStaffGroup (shop_staff_group) {
    const filter = {
      id: shop_staff_group.id,
    }
    return await API.graphql({
      query: deleteShopStaffGroup,
      variables: {input: filter}
    });
  },
  // スタッフグループ所属メンバー登録
  async apiCreateStaffGroupStaff (staff_group, staff_id) {
    const data = this.generateStaffGroupStaffObject(staff_group, staff_id)
    const result =  await API.graphql({
      query: createShopStaffGroupStaff,
      variables: { input: data }
    })
    return result.data.createShopStaffGroupStaff
  },
  generateStaffGroupStaffObject (staff_group, staff_id) {
    return {
      staff_group_cd: staff_group.staff_group_cd,
      shop_staff_id: staff_id
    }
  },
  // スタッフグループ所属メンバー取得
  async apiGetStaffGroupStaff (staff_group) {
    const filter = {
      staff_group_cd: {
        eq: staff_group.staff_group_cd
      }
    }
    const results = await API.graphql({
      query: listShopStaffGroupStaffs,
      variables: { filter: filter }
    })
    return results.data.listShopStaffGroupStaffs.items
  },
  // スタッフグループ所属メンバー削除
  async apiDeleteStaffGroupStaff (staff) {
    const filter = {
      id: staff.id,
    }
    return await API.graphql({
      query: deleteShopStaffGroupStaff,
      variables: {input: filter}
    });
  }
}
