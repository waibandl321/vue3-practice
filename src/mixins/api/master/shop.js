import { API } from 'aws-amplify'
import { createShop, updateShop, createShopStaff } from '@/graphql/mutations'
import { listShops, listShopStaffs } from '@/graphql/queries'
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

// ショップスタッフ作成
async function apiCreateShopStaff () {
  const shop_staff = generateShopStaffObject()
  return await API.graphql({
    query: createShopStaff,
    variables: { input: shop_staff }
  }).then((res) => {
    alert(`店舗「${res.data.createShopStaff.shop_cd}」にメンバーを招待しました。`)
  }).catch((error) => {
    alert(`店舗へのメンバー招待に失敗しました。`)
    console.log(error)
    return null
  })
}

function generateShopStaffObject () {
  return {
    shop_staff_id: uuid.v4(),
    shop_cd: store.getters.invitationShopCode,
    staff_id: store.getters.staff.staff_id,
    status: 0,
    delete: 0
  }
}

async function apiGetShopStaffList(company_shop_cd) {
  const filter = {
    shop_cd: {
      eq: company_shop_cd
    }
  }
  const results = await API.graphql({
    query: listShopStaffs,
    variables: { filter: filter }
  })
  return results.data.listShopStaffs.items
}

export default {
  apiCreateShop,
  apiUpdateShop,
  apiGetShops,
  apiCreateShopStaff,
  apiGetShopStaffList
}
