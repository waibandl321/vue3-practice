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
      :params="params"
    />
    <ShopInvite
      v-if="mode === 'invite'"
      :changeMode="changeMode"
      :params="params"
    />
    <ShopInviteProcedure
      v-if="mode === 'invite-procedure'"
    />
    <ShopStaffList
      v-if="mode === 'staff-list'"
      :changeMode="changeMode"
      :params="params"
    />
    <StaffGroupIndex
      v-if="mode === 'staff-group'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import areaApiFunc from '@/mixins/api/master/area.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import roleFunc from '@/mixins/api/master/role.js'
import store from '@/store'

import Header from '@/components/common/PcHeader.vue'
import ShopList from '@/components/master/shop/ShopList.vue'
import ShopEdit from '@/components/master/shop/ShopEdit.vue'
import ShopDetail from '../../components/master/shop/ShopDetail.vue'
import ShopInvite from '@/components/master/shop/invite/ShopInvite.vue'
import ShopInviteProcedure from '@/components/master/shop/invite/ShopInviteProcedure.vue'
import ShopStaffList from '@/components/master/shop/ShopStaffList.vue'
import StaffGroupIndex from '@/components/master/shop/staff_group/StaffGroup.vue'
import { reactive, ref } from '@vue/reactivity'


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
    // props初期値
    const params = reactive({
      viewer: {},
      editor: {},
      is_new: false,
      brands: [],
      areas: [],
      roles: []
    })
    // 招待遷移
    if (store.getters.invitationShopCode) {
      console.log('店舗招待コードあり');
      mode.value = 'invite-procedure'
      // return;
    }
    // 店舗以外のマスタデータ読み込み
    const init = async () => {
      params.brands = await brandApiFunc.apiGetBrand()
      params.areas = await areaApiFunc.apiGetArea()
      params.roles = roleFunc.getSystemRoleList()
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
      params.viewer = item
    }
    // 編集・新規データセット
    const setEditor = (item, is_new = false) => {
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
        params.editor = item
      }
      mode.value = "edit"
    }
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor
    }
  }
}
</script>
