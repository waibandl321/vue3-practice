<template>
  <v-container class="im-container">
    <div>
      グループ<br>
      {{ groups }}
    </div>
    <AppAlert
      :success="inj_params.success"
      :error="inj_params.error"
    />
    <v-card-title>{{ inj_params.viewer.shop_name }} スタッフグループ</v-card-title>
    <div v-if="groups.length === 0">
      <v-card-text>スタッフグループはありません</v-card-text>
    </div>
    <div v-else>
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
    </div>
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
  <OverlayLoading v-if="loading" />
</template>

<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import PcFooter from '@/components/common/PcFooter.vue'

import apiFunc from '@/mixins/api/api.js'

import { inject, ref } from 'vue'

export default {
  name: 'staff-group-list',
  components: {
    PcFooter,
    OverlayLoading,
    AppAlert
  },
  props: {
    changeMode: Function,
    setGroupViewer: Function
  },
  setup (props) {
    const injFuncMessageSet = inject('message-set')
    const inj_params = inject('shop-params')
    
    const loading = ref(false)
    // スタッフグループ一覧
    const groups = ref([])
    const getStaffGroup = () => {
      groups.value = inj_params.viewer.groups.items
    }
    getStaffGroup()

    // スタッフグループ作成
    const staff_group_create_modal = ref(false)
    const staff_group_name = ref('')
    const createStaffGroup = async () => {
      staff_group_create_modal.value = false
      loading.value = true
      try {
        const result = await apiFunc.apiCreateStaffGroup(inj_params.viewer, staff_group_name.value)
        groups.value.push(result)
        injFuncMessageSet('スタッフグループを作成しました', 'success')
      } catch (error) {
        console.log(error);
      }
      loading.value = false
      staff_group_name.value = ""
    }

    // スタッフグループ削除
    const deleteStaffGroup = async (staff_group) => {
      if(!confirm('削除後は復元できません。よろしいですか？')) return;
      loading.value = true
      try {
        await apiFunc.apiDeleteStaffGroup(staff_group)
        await deleteStaffGroupMembers(staff_group)
        await refreshGroups()
        injFuncMessageSet('スタッフグループを削除しました。', 'success')
      } catch (error) {
        console.log(error);
      }
      loading.value = false
      // メンバー削除
      async function deleteStaffGroupMembers (staff_group) {
        const members = staff_group.members.items
        if(members.length > 0) {
          for (const member of members) {
            await apiFunc.apiDeleteStaffGroupStaff(member) 
          }
        }
      }
    }
    // 再読み込み
    async function refreshGroups () {
      try {
        groups.value = await apiFunc.apiGetStaffGroups(inj_params.viewer)
      } catch (error) {
        console.log(error);
      }
    }

    // スタッフグループ詳細へ
    const viewStaffGroup = (group) => {
      props.setGroupViewer(group)
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
      inj_params,
      loading,
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