import { API } from 'aws-amplify'
import { createChat } from '@/graphql/mutations'
// import {  } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
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
  createGroup () {},
  updateGroup () {},
  deleteGroup () {},
  createMessage () {},
  deleteMessage () {}
}