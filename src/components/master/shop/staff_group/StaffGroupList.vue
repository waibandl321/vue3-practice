<template>
  <v-container>
    <div>
      店舗<br>
      {{ params.viewer }}
    </div>
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ</v-card-title>
    <v-card
      v-for="(group, idx) in groups"
      :key="idx"
      class="mt-4"
      link
      @click="viewStaffGroup(group)"
    >
      <v-card-actions class="justify-space-between">
        <span>{{ group.group_name }}</span>
        <span>
          <v-btn
            icon="mdi-delete"
            color="primary"
            @click.stop="deleteStaffGroup(group)"
          ></v-btn>
        </span>
      </v-card-actions>
    </v-card>
    <PcFooter :options="footer_options" />
    <div class="fixed-btn">
      <v-btn
        color="primary"
        icon="mdi-plus"
        size="x-large"
        @click="staff_group_create_modal = true"
      ></v-btn>
    </div>
    <v-dialog v-model="staff_group_create_modal">
      <v-card width="500">
        <v-card-title>スタッフグループ作成</v-card-title>
        <v-card-item>
          <v-card-subtitle>スタッフグループ名</v-card-subtitle>
          <v-text-field
            v-model="staff_group_name"
          ></v-text-field>
        </v-card-item>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            @click="staff_group_create_modal = false"
          >キャンセル</v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            @click="createStaffGroup()"
          >作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import { ref } from 'vue'
import shopApiFunc from '@/mixins/api/master/shop.js'

export default {
  name: 'staff-group-list',
  components: {
    PcFooter
  },
  props: {
    params: Object,
    changeMode: Function,
    changeModeStaffGroup: Function,
    setViewer: Function
  },
  setup (props) {
    const staff_group_create_modal = ref(false)
    // スタッフグループ一覧取得
    const groups = ref([])
    const getStaffGroup = () => {
      groups.value = props.params.viewer.groups.items
      console.log(groups.value);
    }
    getStaffGroup()

    // スタッフグループ作成
    const staff_group_name = ref('')
    const createStaffGroup = async () => {
      try {
        const shop = props.params.viewer
        const result = await shopApiFunc.apiCreateShopStaffGroup(shop, staff_group_name.value)
        groups.value.push(result)
        alert('スタッフグループを作成しました')
      } catch (error) {
        alert(error);
        console.log(error);
      }
      staff_group_create_modal.value = false
    }
    // スタッフグループ削除
    const deleteStaffGroup = async (staff_group) => {
      try {
        await shopApiFunc.apiDeleteShopStaffGroup(staff_group).then(() => {
          groups.value = groups.value.filter(v => v.id !== staff_group.id)
          alert(`スタッフグループ${staff_group.group_name}を削除しました。`)
        })
      } catch (error) {
        console.log(error);
        alert(error)
      }
    }
    // スタッフグループ詳細へ
    const viewStaffGroup = (group) => {
      props.setViewer(group)
      props.changeModeStaffGroup('staff-group-detail')
    }
    // スタッフグループ一覧へ
    const backFunc = () => {
      props.changeMode('list')
    }
    const footer_options = {
      back: [
        { text: '店舗一覧へ戻る', callback: backFunc }
      ]
    }

    return {
      staff_group_create_modal,
      staff_group_name,
      groups,
      footer_options,
      createStaffGroup,
      deleteStaffGroup,
      viewStaffGroup,
      backFunc
    }
  }
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 64px;
  right: 24px;
}
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