<template>
  <Header />
  <v-main>
    <ShopList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <ShopDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
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
    <ShopStaffList
      v-if="mode === 'staff-list'"
      :changeMode="changeMode"
      :params="params"
    />
    <StaffGroupList
      v-if="mode === 'staff-group-list'"
      :changeMode="changeMode"
      :params="params"
    />
    <StaffGroupDetail
      v-if="mode === 'staff-group-detail'"
      :changeMode="changeMode"
      :params="params"
    />
    <StaffGroupEdit
      v-if="mode === 'staff-group-edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import areaApiFunc from '@/mixins/api/master/area.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import roleFunc from '@/mixins/api/master/role.js'

import Header from '@/components/common/PcHeader.vue'
import ShopList from '@/components/master/shop/ShopList.vue'
import ShopEdit from '@/components/master/shop/ShopEdit.vue'
import ShopDetail from '../../components/master/shop/ShopDetail.vue'
import ShopInvite from '@/components/master/shop/ShopInvite.vue'
import ShopStaffList from '@/components/master/shop/ShopStaffList.vue'
import StaffGroupList from '@/components/master/shop/staff_group/StaffGroupList.vue'
import StaffGroupDetail from '@/components/master/shop/staff_group/StaffGroupDetail.vue'
import StaffGroupEdit from '@/components/master/shop/staff_group/StaffGroupEdit.vue'

export default {
  name: 'master-shop',
  components: {
    Header,
    ShopList,
    ShopEdit,
    ShopDetail,
    ShopInvite,
    ShopStaffList,
    StaffGroupList,
    StaffGroupDetail,
    StaffGroupEdit
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
    }
  }
}
</script>
