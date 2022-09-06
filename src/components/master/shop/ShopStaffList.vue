<template>
  <v-container>
    {{ items }}
    <v-card>
      <v-card-title>「{{ params.viewer.shop_name }}」 従業員一覧</v-card-title>
      <v-table height="50vh">
        <thead>
          <tr>
            <th>氏名</th>
            <th>権限</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="staff in items"
            :key="staff.employee.id"
          >
            <td>{{ staff.employee.last_name }}{{ staff.employee.first_name }}</td>
            <td>{{ staff.staff_role.role_cd }}</td>
            <td>
              <div class="drop-menu">
                <v-btn
                    icon="mdi-dots-vertical"
                    size="small"
                    variant="text"
                    @click="staffListMenu(staff)"
                  ></v-btn>
                  <v-list
                    v-if="active_menu === staff.shop_staff.staff_id"
                    class="drop-items"
                    border
                  >
                    <v-list-item>
                      <v-btn 
                        variant="text"
                        color="primary"
                        block
                        @click="clickChangeRole(staff)"
                      >権限変更</v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn variant="text"
                        color="primary"
                        block
                        @click="clickDeleteShopStaff(staff)"
                      >店舗から削除</v-btn>
                    </v-list-item>
                  </v-list>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <!-- 権限変更ダイアログ -->
    <v-dialog v-model="role_dialog">
      <v-card width="500">
        <v-card-title>権限変更</v-card-title>
        <v-card-item>
          <v-card-subtitle>氏名</v-card-subtitle>
          <v-card-text>
            {{ active_staff.employee.last_name }}
            {{ active_staff.employee.first_name }}
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>権限</v-card-subtitle>
          <v-select
            v-model="active_staff.staff_role.role_cd"
            :items="params.roles"
            item-title="role_name"
            item-value="role_cd"
          ></v-select>
        </v-card-item>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            @click="closeModal()"
          >キャンセル</v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            @click="saveChangeRole()"
          >保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import { ref } from '@vue/reactivity'
import shopApiFunc from '@/mixins/api/master/shop'
import employeeApiFunc from '@/mixins/api/master/employee'
import accountApiFunc from '@/mixins/api/account'
export default {
  name: 'shop-invite',
  components: {
    PcFooter
  },
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    // 店舗従業員取得
    const items = ref([])
    let members = []
    const getShopStaff = async () => {
      try {
        members = await shopApiFunc.apiGetShopStaffList(props.params.viewer.company_shop_cd)
        members.forEach( async (member) => {
          const item = {}
          item.shop_staff = member
          item.employee = await employeeApiFunc.apiGetEmployeeRelateStaffId(member.staff_id)
          item.staff_role = await accountApiFunc.apiGetStaffRole(member.staff_id)
          items.value.push(item)
        })
      } catch (error) {
        console.log(error)
      }
    }
    getShopStaff()

    const footer_options = {
      back: [
        { text: '店舗一覧へ戻る', callback: props.changeMode }
      ]
    }

    const active_menu = ref(null)
    const role_dialog = ref(false)
    const active_staff = ref({})
    const staffListMenu = (staff) => {
      if(active_menu.value) {
        active_menu.value = null
      } else {
        active_menu.value = staff.shop_staff.staff_id
      }
    }
    const clickChangeRole = (staff) => {
      active_staff.value = staff
      role_dialog.value = true
    }
    // 店舗スタッフ権限変更
    const saveChangeRole = async () => {
      const role = active_staff.value.staff_role
      const staff_id = active_staff.value.employee.staff_id
      await accountApiFunc.apiUpdateStaffRole(staff_id, role)
      role_dialog.value = false
    }
    // 店舗スタッフ削除
    const clickDeleteShopStaff = async (staff) => {
      active_menu.value = null
      try {
        await shopApiFunc.apiDeleteShopStaff(staff.shop_staff.id).then(() => {
          alert('店舗従業員を削除しました。')
        })
        items.value = items.value.filter(v => v.shop_staff.staff_id !== staff.shop_staff.staff_id)
      } catch (error) {
        alert(error)
      }
    }
    const closeModal = () => {
      role_dialog.value = false
    }

    return {
      items,
      footer_options,
      active_menu,
      role_dialog,
      active_staff,
      staffListMenu,
      clickChangeRole,
      saveChangeRole,
      clickDeleteShopStaff,
      closeModal
    }
  },
}
</script>
<style scoped>
.drop-menu {
  position: relative;
}
.drop-items {
  width: 200px;
  position: absolute;
  right: 0;
  z-index: 2;
}
</style>