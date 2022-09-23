import { API } from 'aws-amplify'
import { createCompany, updateCompany } from '@/graphql/mutations'
import { listCompanies } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

async function apiCompanyCreate (company) {
  const _company = generateCompanyObject(company)
  return await API.graphql({
    query: createCompany,
    variables: { input: _company }
  }).then((res) => {
    return res.data.createCompany
  }).catch((error) => {
    console.log(error)
    return null
  })
}

function generateCompanyObject (company) {
  return {
    company_cd: company.company_cd ?? uuid.v4(),
    company_name: company.company_name,
    company_name_kana: company.company_name_kana,
    company_form: company.company_form.value,
    form_name_position: company.form_name_position,
    homepage_url: company.homepage_url,
    membership: company.membership ? 7 : 9,
    certified: company.certified ? 0 : 1,
    status: 0,
    delete: 0
  }
}

async function apiGetCompany () {
  const filter = {
    company_cd: {
      eq: store.getters.companyCd
    }
  }
  const results = await API.graphql({
    query: listCompanies,
    variables: { filter: filter }
  })
  return results.data.listCompanies.items
}

async function apiGetCompanyFromInvitation (_company_cd) {
  const filter = {
    company_cd: {
      eq: _company_cd
    }
  }
  const results = await API.graphql({
    query: listCompanies,
    variables: { filter: filter }
  })
  return results.data.listCompanies.items[0]
}

async function apiUpdateCompany (_company) {
  const item = generateCompanyObject(_company)
  item.id = _company.id

  await API.graphql({
    query: updateCompany,
    variables: { input: item }
  })
}

export default {
  apiCompanyCreate,
  apiGetCompany,
  apiUpdateCompany,
  apiGetCompanyFromInvitation
}
