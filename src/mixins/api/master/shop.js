import { API } from 'aws-amplify'
import { createShop, updateShop, createShopStaff, deleteShopStaff, createShopStaffGroup, 
  deleteShopStaffGroup, createShopStaffGroupStaff, deleteShopStaffGroupStaff } from '@/graphql/mutations'
import { listShops, listShopStaffs, listShopStaffGroups, listShopStaffGroupStaffs } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

async function apiCreateShop (shop) {
  const _shop = generateShopObject(shop)
  return await API.graphql({
    query: createShop,
    variables: { input: _shop }
  }).then((res) => {
    alert(`「${res.data.createShop.shop_name}」を作成しました。`)
    return res.data.createShop
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function apiUpdateShop (_shop) {
  const item = generateShopObject(_shop)
  item.id = _shop.id

  await API.graphql({
    query: updateShop,
    variables: { input: item }
  }).then(() => {
    alert(`店舗情報を更新しました。`)
  }).catch((error) => {
    console.log(error)
    alert(`店舗情報の更新に失敗しました。エラーメッセージ:${error}`)
  })
}

function generateShopObject (shop) {
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
}

async function apiGetShops () {
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
}

// 店舗スタッフ
async function apiCreateShopStaff () {
  const shop_staff = generateShopStaffObject()
  return await API.graphql({
    query: createShopStaff,
    variables: { input: shop_staff }
  })
}
function generateShopStaffObject () {
  return {
    shop_staff_id: uuid.v4(),
    company_shop_cd: store.getters.invitationShopCode,
    staff_id: store.getters.staff.staff_id,
    status: 0,
    delete: 0
  }
}
async function apiGetShopStaffList(company_shop_cd) {
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
}
async function apiDeleteShopStaff (id) {
  const filter = {
    id: id,
  }
  return await API.graphql({
    query: deleteShopStaff,
    variables: {input: filter}
  });
}
// スタッフグループ作成
async function apiCreateShopStaffGroup (shop, staff_group_name) {
  const shop_staff_group = generateCreateShopStaffObject(shop, staff_group_name)
  return await API.graphql({
    query: createShopStaffGroup,
    variables: { input: shop_staff_group }
  })
}
function generateCreateShopStaffObject (shop, staff_group_name) {
  return {
    staff_group_cd: uuid.v4(),
    company_shop_cd: shop.company_shop_cd,
    group_name: staff_group_name,
    staff_id: store.getters.staff.staff_id
  }
}
// スタッフグループ取得
async function apiGetShopStaffGroup (shop) {
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
}
// スタッフグループ削除
async function apiDeleteShopStaffGroup (shop_staff_group) {
  const filter = {
    id: shop_staff_group.id,
  }
  return await API.graphql({
    query: deleteShopStaffGroup,
    variables: {input: filter}
  });
}
// スタッフグループ所属メンバー登録
async function apiCreateStaffGroupStaff (staff_group, shop_staff_id) {
  const data = generateStaffGroupStaffObject(staff_group, shop_staff_id)
  return await API.graphql({
    query: createShopStaffGroupStaff,
    variables: { input: data }
  })
}
function generateStaffGroupStaffObject (staff_group, shop_staff_id) {
  return {
    staff_group_cd: staff_group.staff_group_cd,
    shop_staff_id: shop_staff_id
  }
}
// スタッフグループ所属メンバー取得
async function apiGetStaffGroupStaff (staff_group) {
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
}
// スタッフグループ所属メンバー削除
async function apiDeleteStaffGroupStaff (staff) {
  const filter = {
    id: staff.id,
  }
  return await API.graphql({
    query: deleteShopStaffGroupStaff,
    variables: {input: filter}
  });
}

export default {
  apiCreateShop,
  apiUpdateShop,
  apiGetShops,
  apiCreateShopStaff,
  // 店舗スタッフ
  apiGetShopStaffList,
  apiDeleteShopStaff,
  // スタッフグループ
  apiCreateShopStaffGroup,
  apiGetShopStaffGroup,
  apiDeleteShopStaffGroup,
  // スタッフグループ所属メンバー
  apiCreateStaffGroupStaff,
  apiGetStaffGroupStaff,
  apiDeleteStaffGroupStaff
}
