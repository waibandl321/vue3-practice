<template>
  <v-container class="im-container">
    <v-card>
      <AppAlert
        :success="params.success"
        :error="params.error"
      />
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
            v-for="(staff, idx) in items"
            :key="idx"
          >
            <td>{{ staff.employee.last_name }}{{ staff.employee.first_name }}</td>
            <td>{{ staff.staff_role.role_cd }}</td>
            <td>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="text"
                    v-bind="props"
                    icon="mdi-dots-horizontal"
                    size="small"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    density="compact"
                    link
                    @click="clickChangeRole(staff)"
                    title="権限変更"
                  ></v-list-item>
                  <v-list-item
                    density="compact"
                    link
                    @click="clickDeleteShopStaff(staff)"
                    title="店舗から削除"
                  ></v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- 権限変更ダイアログ -->
    <v-dialog v-model="role_change_dialog">
      <v-card width="500">
        <v-card-title>権限変更</v-card-title>
        <v-card-item>
          <v-card-subtitle>氏名</v-card-subtitle>
          <v-card-text>
            {{ role_change_staff.employee.last_name }}
            {{ role_change_staff.employee.first_name }}
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>権限</v-card-subtitle>
          <v-select
            v-model="role_change_staff.staff_role.role_cd"
            :items="params.roles"
            item-title="role_name"
            item-value="role_cd"
          ></v-select>
        </v-card-item>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            @click="role_change_dialog = false"
          >キャンセル</v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            @click="saveChangeRole()"
          >保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <footer class="fixed-footer">
      <div class="back">
        <v-btn
          @click="changeMode('list')"
        >店舗一覧へ戻る
        </v-btn>
      </div>
    </footer>
  </v-container>
</template>

<script>
import AppAlert from '@/components/common/AppAlert.vue'

import { ref } from '@vue/reactivity'
import shopApiFunc from '@/mixins/api/master/shop'
import accountApiFunc from '@/mixins/api/account'

export default {
  components: {
    AppAlert
  },
  props: {
    params: {
      type: Object
    },
    changeMode: {
      type: Function
    },
    messageSet: {
      type: Function
    }
  },
  setup (props) {
    // 店舗従業員取得
    const items = ref([])
    const getShopStaffList = async () => {
      console.log('props.params.viewer.staffs.items', props.params.viewer.staffs.items);
      for (const shop_staff of props.params.viewer.staffs.items) {
        shop_staff.employee = shop_staff.employee.items[0]
        shop_staff.staff_role = shop_staff.role.items[0]
        items.value.push(shop_staff)
      }
    }
    getShopStaffList()

    const role_change_dialog = ref(false)
    const role_change_staff = ref({})
    
    const clickChangeRole = (staff) => {
      role_change_staff.value = staff
      role_change_dialog.value = true
    }
    // 店舗スタッフ権限変更
    const saveChangeRole = async () => {
      role_change_dialog.value = false
      const role = role_change_staff.value.staff_role
      const staff_id = role_change_staff.value.employee.staff_id
      try {
        await accountApiFunc.apiUpdateStaffRole(staff_id, role)
        props.messageSet('スタッフの権限を更新しました。', 'success')
      } catch (error) {
        console.error(error);
      }
    }
    // 店舗スタッフ削除
    const clickDeleteShopStaff = async (staff) => {
      try {
        await shopApiFunc.apiDeleteShopStaff(staff.id)
        // スタッフグループからも削除する
        await deleteFromStaffGroup()
        props.messageSet('店舗従業員を削除しました。', 'success')
        items.value = items.value.filter(v => v.staff_id !== staff.staff_id)
      } catch (error) {
        console.error(error)
      }

      async function deleteFromStaffGroup () {
        const groups = props.params.viewer.groups.items
        for (const group of groups) {
          const delete_staff = group.members.items.find(r => r.shop_staff_id === staff.staff_id)
          if(delete_staff) {
            await shopApiFunc.apiDeleteStaffGroupStaff(delete_staff)
          }
        }
      }
    }

    return {
      items,
      role_change_dialog,
      role_change_staff,
      clickChangeRole,
      saveChangeRole,
      clickDeleteShopStaff,
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