import { API } from 'aws-amplify'
import { createChat, createChatRoom, deleteChatRoom } from '@/graphql/mutations'
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
  deleteRoom () {
    deleteChatRoom
  },
  createMessage () {},
  deleteMessage () {}
}