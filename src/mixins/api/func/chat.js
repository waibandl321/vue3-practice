import { API } from 'aws-amplify'
import { createChat, createChatRoom, createChatRoomMember,
  deleteChatRoom, deleteChatRoomMember } from '@/graphql/mutations'
import { listChats } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
  // 企業チャット作成（初回のみ）
  async apiCreateChat (company) {
    const chatObj = this.generateChatObject(company)
    return await API.graphql({
      query: createChat,
      variables: { input: chatObj }
    })
  },
  generateChatObject (company) {
    return {
      chat_id: uuid.v4(),
      chat_name: company.company_name,
      company_cd: company.company_cd,
      company_group_cd: company.company_group_cd,
      owner_id: store.getters.staff.staff_id,
    }
  },
  async getCompanyChat () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listChats,
      variables: { filter: filter }
    })
    return results.data.listChats.items[0]
  },
  async createRooom (_room, company_chat) {
    const room = this.generateChatRoomObject(_room, company_chat)
    return await API.graphql({
      query: createChatRoom,
      variables: { input: room }
    }).then((res) => {
      return res.data.createChatRoom
    })
  },
  generateChatRoomObject (_room, company_chat) {
    return {
      room_id: _room.id ?? uuid.v4(),
      room_name: _room.room_name,
      room_type: _room.room_type,
      send_notice: _room.send_notice ? 0 : 1,
      owner_staff_id: store.getters.staff.staff_id,
      delete: 0,
      chat_id: company_chat.id
    }
  },
  updateGroup () {},
  async deleteRoom (room) {
    const filter = {
      id: room.id,
    }
    return await API.graphql({
      query: deleteChatRoom,
      variables: {input: filter}
    });
  },
  async deleteRoomMember(member) {
    const filter = {
      id: member.id
    }
    return await API.graphql({
      query: deleteChatRoomMember,
      variables: {input: filter}
    });
  },
  // ルーム作成時に
  async createInitRoomMember (room, datetime, ) {
    const init_room_member = this.generateInitRoomMemberObject(room, datetime)
    return await API.graphql({
      query: createChatRoomMember,
      variables: { input: init_room_member }
    })
    // .then((res) => {
    //   return res.data.createChatRoomMember
    // })
  },
  generateInitRoomMemberObject (room, datetime) {
    return {
      room_id: room.room_id,
      member_id: store.getters.staff.staff_id, // 作成者のstaff_idを登録
      send_notice: room.send_notice,
      room_name: room.type === 0 ? room.room_name : "", // MEMO: 個人チャットの場合は相手側のスタッフ名が表示されるようにする
      ignore: null,
      last_access: datetime
    }
  },
  createMessage () {},
  deleteMessage () {},

}