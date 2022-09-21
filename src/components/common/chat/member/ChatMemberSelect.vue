<template>
  <v-dialog v-model="member_modal">
    <v-card width="600">
      <v-card-title>メンバー</v-card-title>
      <v-card-item>
        <v-card-subtitle>メンバー</v-card-subtitle>
        <v-card
          v-for="(member, m) in current_members"
          :key="m"
          class="mx-auto"
          prepend-icon="mdi-account"
        >
          <template v-slot:subtitle>
            {{ getMemberName(member.member_id) }}
          </template>
          <template
            v-if="judgeOwner(member.member_id)"
            v-slot:append
          >
            <v-btn
              color="error"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="deleteMember(member)"
            ></v-btn>
          </template>
        </v-card>
      </v-card-item>
      <v-card-item class="mt-6">
        <v-card-subtitle>ユーザー</v-card-subtitle>
        <v-card
          v-for="(member, e) in selectable_members"
          :key="e"
          class="mx-auto"
          prepend-icon="mdi-account"
        >
          <template v-slot:subtitle>
            {{ member.last_name }}{{ member.first_name }}
          </template>
          <template v-slot:append>
            <v-checkbox
              v-model="is_selected_members"
              :value="member"
              hide-details="auto"
              color="primary"
            ></v-checkbox>
          </template>
        </v-card>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          class="mr-2"
          @click="member_modal = false"
        >キャンセル</v-btn>
        <v-btn
          variant="flat"
          color="primary"
          :disabled="is_selected_members.length === 0"
          @click="addMember()"
        >追加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { inject, ref } from '@vue/runtime-core'
import chatApiFunc from '@/mixins/api/func/chat'

export default {
  props: {
    viewRoom: {
      type: Object
    }
  },
  setup(props) {
    const loading = ref(false);
    const $params = inject('params')
    const member_modal = ref(true)
    const current_members = ref([])
    const company_employees = ref([])
    const selectable_members = ref([])
    const is_selected_members = ref([])

    getMembers()
    function getMembers () {
      current_members.value = props.viewRoom.members.items
      company_employees.value = $params.company_employees
      selectable_members.value = company_employees.value.filter((v) => {
        return !current_members.value.find(s => s.member_id === v.staff_id)
      })
    }
    const getMemberName = (staff_id) => {
      const result = company_employees.value.find(v => v.staff_id === staff_id)
      return result ? result.last_name + result.first_name : ""
    }
    const addMember = async () => {
      loading.value = true
      try {
        for (const is_selected_member of is_selected_members.value) {
          const result = await chatApiFunc.addChatMember(props.viewRoom, is_selected_member)
          current_members.value.push(result)
          selectable_members.value = selectable_members.value.filter(v => v.staff_id !== result.member_id)
        }
        alert('メンバーを追加しました。')
      } catch (error) {
        console.error(error);
      }
      is_selected_members.value = []
      loading.value = false
    }
    const judgeOwner = (staff_id) => {
      return props.viewRoom.owner_staff_id !== staff_id
    }

    // メンバー削除
    const deleteMember = async (member) => {
      if(!confirm('メンバーを削除します。よろしいですか？')) return;
      
      loading.value = true
      try {
        await chatApiFunc.deleteRoomMember(member)
        alert('メンバーを削除しました。')
        current_members.value = current_members.value.filter(v => v.member_id !== member.member_id)
        selectable_members.value = company_employees.value.filter((v) => {
          return !current_members.value.find(s => s.member_id === v.staff_id)
        })
      } catch (error) {
        console.error(error);
      }
      is_selected_members.value = []
      loading.value = false
    }

    return {
      member_modal,
      selectable_members,
      current_members,
      is_selected_members,
      getMemberName,
      judgeOwner,
      addMember,
      deleteMember,
    }
  },
}
</script>