import { API } from 'aws-amplify'
import { createFileDirTop } from '@/graphql/mutations'
// import {  } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
// import store from '@/store'

export default {
  async apiCreateFile (company) {
    const fileDirTop = this.generateFileDirTopObject(company)
    return await API.graphql({
      query: createFileDirTop,
      variables: { input: fileDirTop }
    })
  },
  generateFileDirTopObject (company) {
    return {
      organization_id: company.company_cd,
      function_cd: "file",
      dir_id: uuid.v4(),
      company_cd: company.company_cd
    }
  }
}