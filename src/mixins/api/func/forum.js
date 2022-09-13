import { API } from 'aws-amplify'
import { createForum } from '@/graphql/mutations'
// import {  } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
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
  create () {},
  update () {},
  delete () {}
}