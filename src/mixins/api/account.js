import { API } from 'aws-amplify'
import { createAccounts, createAssociate, createStaff } from '@/graphql/mutations'
import { listAccountss, listAssociates, listStaffs } from '@/graphql/queries'
import { uuid } from 'vue-uuid'

async function apiAccountCreate (user) {
  console.log('apiAccountCreate', user)
  const account = {
    account_id: uuid.v4(),
    sub: user.attributes.sub,
    status: 0,
    user_name: user.username
  }
  return await API.graphql({
    query: createAccounts,
    variables: { input: account }
  }).then((res) => {
    return res.data.createAccounts
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function apiAssociateCreate (account, company, invite_key = null) {
  const _assosiate = {
    associate_id: uuid.v4(),
    account_id: account.account_id,
    invite_key: invite_key,
    company_group_cd: company.id,
    status: 0,
    delete: 0
  }
  return await API.graphql({
    query: createAssociate,
    variables: { input: _assosiate }
  }).then((res) => {
    return res.data.createAssociate
  }).catch((error) => {
    console.log(error)
    return null
  })
}
async function apiStaffCreate (associate, company, invite_key = null) {
  const _staff = {
    staff_id: uuid.v4(),
    associate_id: associate.associate_id,
    company_cd: company.company_cd,
    company_group_cd: company.id,
    invite_key: invite_key,
    status: 0,
    delete: 0
  }
  return await API.graphql({
    query: createStaff,
    variables: { input: _staff }
  }).then((res) => {
    return res.data.createStaff
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function getAccount (user) {
  const filter = {
    sub: {
      eq: user.attributes.sub
    }
  }
  return await API.graphql({
    query: listAccountss,
    variables: { filter: filter }
  })
}
async function getAssociate (account) {
  const filter = {
    account_id: {
      eq: account.account_id
    }
  }
  return await API.graphql({
    query: listAssociates,
    variables: { filter: filter }
  })
}
async function getStaff (associate) {
  const filter = {
    associate_id: {
      eq: associate.associate_id
    }
  }
  return await API.graphql({
    query: listStaffs,
    variables: { filter: filter }
  })
}

export default {
  apiAccountCreate,
  apiAssociateCreate,
  apiStaffCreate,
  getAccount,
  getStaff,
  getAssociate
}
