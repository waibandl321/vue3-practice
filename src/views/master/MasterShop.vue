<template>
  <Header />
  <v-main>
    <ShopList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :setViewer="setViewer"
      :setEditor="setEditor"
      :params="params"
    />
    <ShopDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :setEditor="setEditor"
      :params="params"
    />
    <ShopEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :messageSet="messageSet"
      :params="params"
    />
    <ShopInvite
      v-if="mode === 'invite'"
      :changeMode="changeMode"
      :params="params"
    />
    <ShopInviteProcedure
      v-if="mode === 'invite-procedure'"
      :changeMode="changeMode"
    />
    <ShopStaffList
      v-if="mode === 'staff-list'"
      :changeMode="changeMode"
      :messageSet="messageSet"
      :params="params"
    />
    <StaffGroupIndex
      v-if="mode === 'staff-group'"
      :changeMode="changeMode"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
import ShopList from '@/components/master/shop/ShopList.vue'
import ShopEdit from '@/components/master/shop/ShopEdit.vue'
import ShopDetail from '../../components/master/shop/ShopDetail.vue'
import ShopInvite from '@/components/master/shop/invite/ShopInvite.vue'
import ShopInviteProcedure from '@/components/master/shop/invite/ShopInviteProcedure.vue'
import ShopStaffList from '@/components/master/shop/ShopStaffList.vue'
import StaffGroupIndex from '@/components/master/shop/staff_group/StaffGroup.vue'

import shopApiFunc from '@/mixins/api/master/shop.js'
import areaApiFunc from '@/mixins/api/master/area.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import roleFunc from '@/mixins/api/master/role.js'
import storeFunc from '@/mixins/store/auth.js'

import { reactive, ref } from '@vue/reactivity'
import _ from 'lodash'
import { provide } from '@vue/runtime-core'

export default {
  name: 'master-shop',
  components: {
    Header,
    ShopList,
    ShopEdit,
    ShopDetail,
    ShopInvite,
    ShopStaffList,
    ShopInviteProcedure,
    StaffGroupIndex
  },
  setup () {
    const mode = ref('list')
    // 招待遷移
    if (storeFunc.storeGetInvitationShopCode()) {
      console.log('店舗招待コード', storeFunc.storeGetInvitationShopCode());
      mode.value = 'invite-procedure'
    }
    
    const params = reactive({
      items: [],
      brands: [],
      areas: [],
      roles: [],
      company_employees: [],

      viewer: {},
      editor: {},
      is_new: false,

      success: "",
      error: "",
      loading: false
    })

    // 店舗以外のマスタデータ読み込み
    const init = async () => {
      params.loading = true
      try {
        params.brands = await brandApiFunc.apiGetBrand()
        params.areas = await areaApiFunc.apiGetArea()
        params.items = await shopApiFunc.apiGetShops()
        params.roles = roleFunc.getSystemRoleList()
      } catch (error) {
        params.error = 'データの読み込みに失敗しました。'
        console.error(error);
      }
      params.loading = false
    }
    init()
    // 表示モード切り替え
    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.is_new = true
      }
      mode.value = _mode
    }
    // 詳細データセット
    const setViewer = (item) => {
      params.success = ""
      params.error = ""
      params.viewer = item
    }
    // 編集・新規データセット
    const setEditor = (item, is_new = false) => {
      params.success = ""
      params.error = ""
      if(is_new) {
        params.is_new = true
        params.editor = {
          shop_cd: "",
          shop_name: "",
          shop_name_kana: "",
          brand_cd: "",
          area_cd: "",
          address: "",
          phone: "",
          status: 0,
          delete: 0
        }
      } else {
        params.editor = _.cloneDeep(item)
      }
      mode.value = "edit"
    }

    const messageSet = (message, type) => {
      params[type] = message
    }
    // MEMO: 孫コンポーネントは、provide / inject形式でバインド
    provide('message-set', messageSet)
    provide('shop-params', params)

    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      messageSet
    }
  }
}
</script>
