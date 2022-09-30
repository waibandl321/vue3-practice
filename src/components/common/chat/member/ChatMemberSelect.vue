<template>
  <v-card width="800">
    <v-card-title>メンバー</v-card-title>
    <v-card-item>
      <v-card-subtitle>メンバー</v-card-subtitle>
      <v-card
        v-for="(member, m) in params.room_viewer.members.items"
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
        <template
          v-if="judgeOwner(member.member_id)"
          v-slot:append
        >
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
        @click="closeMemberModal()"
      >キャンセル</v-btn>
      <v-btn
        variant="flat"
        color="primary"
        :disabled="is_selected_members.length === 0"
        @click="addMember()"
      >追加</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject, onBeforeMount, ref } from '@vue/runtime-core'
import chatApiFunc from '@/mixins/api/func/chat'
import utilMixin from '@/mixins/utils/utils.js'
import storeAuth from '@/mixins/store/auth.js'

export default {
  props: {
    closeMemberModal: {
      type: Function
    }
  },
  setup(props) {
    const params = inject("params");
    const messageSet = inject('message-set')

    const selectable_members = ref([]);
    const is_selected_members = ref([]);
    
    onBeforeMount(() => {
      dataShaping();
    })

    // 追加可能メンバー取得
    function dataShaping () {
      selectable_members.value = params.company_employees.filter((v) => {
        return !params.room_viewer.members.items.find(s => s.member_id === v.staff_id);
      });
    }

    // 権限チェック (ルーム作成者のみメンバーの削除、追加を可能とする)
    const judgeOwner = (staff_id) => {
      return params.room_viewer.owner_staff_id !== staff_id &&
      params.room_viewer.owner_staff_id === storeAuth.storeGetStaffId();
    };

    // 名前表示
    const getMemberName = (staff_id) => {
      const result = params.company_employees.find(v => v.staff_id === staff_id);
      return result ? result.last_name + result.first_name : "";
    };

    // メンバー追加
    const addMember = async () => {
      params.loading = true;
      try {
        for (const is_selected_member of is_selected_members.value) {
          const res = await chatApiFunc.addChatMember(
            params.room_viewer,
            is_selected_member,
            utilMixin.currentDateTime()
          );
          params.room_viewer.members.items.push(res)
        }
        dataShaping();
        messageSet("メンバーを追加しました。", "success");
      }
      catch (error) {
        console.error(error);
      }
      params.loading = false;
      is_selected_members.value = [];
      props.closeMemberModal();
    };

    // メンバー削除
    const deleteMember = async (member) => {
      if (!confirm("メンバーを削除します。よろしいですか？")) return;
      params.loading = true;
      try {
        await chatApiFunc.deleteRoomMember(member);
        params.room_viewer.members.items = 
          params.room_viewer.members.items.filter(v => v.id !== member.id)
        dataShaping();
        messageSet("メンバーを削除しました。", "success");
      }
      catch (error) {
        console.error(error);
      }
      params.loading = false;
      is_selected_members.value = [];
      props.closeMemberModal();
    };

    return {
      params,
      selectable_members,
      is_selected_members,
      getMemberName,
      judgeOwner,
      addMember,
      deleteMember,
    };
  }
}
</script>