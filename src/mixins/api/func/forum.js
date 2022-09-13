import { API } from 'aws-amplify'
import { createForum, createForumPost } from '@/graphql/mutations'
// import {  } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
  // 企業掲示板テーブル作成
  async apiCreateForum (company) {
    const forumObj = this.generateForumObject(company)
    return await API.graphql({
      query: createForum,
      variables: { input: forumObj }
    })
  },
  generateForumObject (company) {
    return {
      forum_id: uuid.v4(),
      forum_name: company.company_name,
      company_cd: company.company_cd,
      company_group_cd: company.company_group_cd,
      owner_id: store.getters.staff.staff_id,
    }
  },
  async create () {
    const post = this.generateForumPostObject()
    return await API.graphql({
      query: createForumPost,
      variables: { input: post }
    })
  },
  update () {},
  generateForumPostObject () {},
  delete () {}
}