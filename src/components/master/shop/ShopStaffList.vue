<template>
  <v-container>
    {{ params.viewer }}
    <v-card>
      <v-card-title>{{ params.viewer.shop_name }} 従業員一覧</v-card-title>
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
            v-for="staff in dummy_staff"
            :key="staff.staff_id"
          >
            <td>{{ staff.employee_name }}</td>
            <td>{{ staff.role_cd }}</td>
            <td>
              <div class="drop-menu">
                <v-btn
                    icon="mdi-dots-vertical"
                    size="small"
                    variant="text"
                    @click="staffListMenu(staff)"
                  ></v-btn>
                  <v-list
                    v-if="active_menu === staff.staff_id"
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
          <v-card-text>{{ active_staff.employee_name }}</v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-subtitle>権限</v-card-subtitle>
          <v-select
            v-model="active_staff.role_cd"
            :items="params.roles"
            item-title="role_name"
            :item-value="role_cd"
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
export default {
  name: 'shop-invite',
  components: {
    PcFooter
  },
  props: {
    params: Object,
    changeMode: Function
  },
  data () {
    return {
      dummy_staff: [
        { staff_id: '001', role_cd: "officer", employee_name: '開発太郎' },
        { staff_id: '002', role_cd: "staff", employee_name: '反町隆' },
      ],
      
      active_menu: null,
      role_dialog: false,
      active_staff: {},
      footer_options: {
        back: [
          { text: '店舗一覧へ戻る', callback: this.changeMode }
        ]
      }
    }
  },
  methods: {
    staffListMenu (staff) {
      if(this.active_menu) {
        this.active_menu = null
      } else {
        this.active_menu = staff.staff_id
      }
    },
    clickChangeRole (staff) {
      this.active_staff = staff
      this.role_dialog = true
    },
    saveChangeRole() {
      this.role_dialog = false
    },
    closeModal() {
      this.role_dialog = false
    },
  }
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