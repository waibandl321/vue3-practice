import { API } from 'aws-amplify'
import { createChat, createChatRoom, createChatRoomMember, createChatPost, createChatFile, createChatUrl,
  updateChatRoom, updateChatRoomMember,
  deleteChatRoom, deleteChatRoomMember, deleteChatPost, deleteChatFile, deleteChatUrl } from '@/graphql/mutations'
import { listChats, listChatRooms, getChatRoom, listChatPosts, listChatRoomMembers } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
  // 企業チャット作成（初回のみ）
  // TODO: 企業登録と同時にインデックスする
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
  async getChatRooms (_chat_id) {
    const filter = {
      chat_id: {
        eq: _chat_id
      }
    }
    const results = await API.graphql({
      query: listChatRooms,
      variables: { filter: filter }
    })
    return results.data.listChatRooms.items
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
  // 現状トークルーム名変更のみ
  async updateRoom(room) {
    const filter = {
      id: room.id,
      room_name: room.room_name,
      send_notice: room.send_notice ? 0 : 1
    }
    return await API.graphql({
      query: updateChatRoom,
      variables: {input: filter}
    });
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
  async getRoomDetail (room) {
    return await API.graphql({
      query: getChatRoom,
      variables: {id: room.id}
    });
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
  async createInitRoomMember (room, datetime) {
    const init_room_member = this.generateInitRoomMemberObject(room, datetime)
    return await API.graphql({
      query: createChatRoomMember,
      variables: { input: init_room_member }
    })
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
  async getChatRoomMember (room) {
    const filter = {
      room_id: {
        eq: room.room_id
      }
    }
    const results = await API.graphql({
      query: listChatRoomMembers,
      variables: { filter: filter }
    })
    return results.data.listChatRoomMembers.items

  },
  async addChatMember (room, member, datetime) {
    const add_room_member = this.generateAddRoomMemberObject(room, member, datetime)
    return await API.graphql({
      query: createChatRoomMember,
      variables: { input: add_room_member }
    }).then((res) => {
      return res.data.createChatRoomMember
    })
  },
  generateAddRoomMemberObject (room, member, datetime) {
    return {
      room_id: room.room_id,
      member_id: member.staff_id,
      send_notice: room.send_notice,
      room_name: room.type === 0 ? room.room_name : "",
      ignore: null,
      last_access: datetime
    }
  },
  async updateChatMember (current_member, last_access_datetime) {
    // console.log("last access log member", current_member);
    const filter = {
      id: current_member.id,
      last_access: last_access_datetime
    }
    return await API.graphql({
      query: updateChatRoomMember,
      variables: {input: filter}
    });
  },
  // メッセージ
  async getMessages (room) {
    const filter = {
      room_id: {
        eq: room.room_id
      }
    }
    const results = await API.graphql({
      query: listChatPosts,
      variables: { filter: filter }
    })
    return results.data.listChatPosts.items
    
  },
  async createChatMessage (room, message_text) {
    const post = this.generateChatMessageObject(room, message_text)
    console.log('send post', post);
    return await API.graphql({
      query: createChatPost,
      variables: { input: post }
    }).then((res) => {
      return res.data.createChatPost
    })
  },
  generateChatMessageObject (room, message_text) {
    return {
      chat_key: uuid.v4(),
      room_id: room.room_id,
      post_text: message_text,
      attached: null,
      url_links: null,
      poster_ids: store.getters.staff.staff_id,
      mentions: null,
      delete: 0,
    }
  },
  async createChatFile (post, file, file_store = undefined) {
    const postFile = this.generateChatFileObject(post, file, file_store)
    return await API.graphql({
      query: createChatFile,
      variables: { input: postFile }
    }).then((res) => {
      return res.data.createChatFile
    })
  },  
  generateChatFileObject (post, file, file_store) {
    return {
      chat_key: post.chat_key,
      sort_number: null,
      file_id: file_store ? file_store.id : file.id,
      file_name: file.file_name ?? file.name,
      data_url: file.data_url
    }
  },
  async createChatUrl (post, url) {
    const postUrl = this.generateChatUrlObject(post, url)
    return await API.graphql({
      query: createChatUrl,
      variables: { input: postUrl }
    }).then((res) => {
      return res.data.createChatUrl
    })
  },
  generateChatUrlObject (post, url) {
    return {
      chat_key: post.chat_key,
      sort_number: null,
      url_key: url.url_key,
      url_value: url.url_value
    }
  },
  async deleteChatMessage (post) {
    const filter = {
      id: post.id,
    }
    return await API.graphql({
      query: deleteChatPost,
      variables: {input: filter}
    });
  },
  async deleteChatFile (chat_file) {
    const filter = {
      id: chat_file.id,
    }
    return await API.graphql({
      query: deleteChatFile,
      variables: {input: filter}
    });
  },
  async deleteChatUrl (chat_url) {
    const filter = {
      id: chat_url.id,
    }
    return await API.graphql({
      query: deleteChatUrl,
      variables: {input: filter}
    });
  },

}