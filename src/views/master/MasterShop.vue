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
  data () {
    return {
      mode: 'list',
      params: {
        viewer: {},
        editor: {},
        is_new: false,

        brands: [],
        areas: [],
        roles: []
      }
    }
  },
  async created () {
    if (store.getters.invitationShopCode) {
      this.mode = 'invite-procedure'
      return;
    }
    this.params.brands = await brandApiFunc.apiGetBrand()
    this.params.areas = await areaApiFunc.apiGetArea()
    this.params.roles = roleFunc.getSystemRoleList()
  },
  methods: {
    changeMode (_mode, is_new = false) {
      if(is_new) {
        this.params.is_new = true
      }
      this.mode = _mode
    },
    setViewer (item) {
      this.params.viewer = item
    },
    setEditor (item, is_new = false) {
      if(is_new) {
        this.params.editor = {
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
        return;
      }
      this.params.editor = item
    }
  }
}
</script>
