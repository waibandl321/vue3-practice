import { API } from 'aws-amplify'
import { createAccounts, createAssociate, createStaff, createStaffRole } from '@/graphql/mutations'
import { listAccounts, listAssociates, listStaff } from '@/graphql/queries'
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

async function apiAssociateCreate (_account, company, invite_key = null) {
  const _assosiate = {
    associate_id: uuid.v4(),
    account_id: _account.account_id,
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
  console.log('staff create');
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
  console.log('getAccount', user)
  const filter = {
    sub: {
      eq: user.attributes.sub
    }
  }
  return await API.graphql({
    query: listAccounts,
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
    query: listStaff,
    variables: { filter: filter }
  })
}

async function apiSetupStaffRoleCreate (staff) {
  const staff_role = {
    role_cd: 'admin',
    staff_id: staff.staff_id,
    company_cd: staff.company_cd,
    status: 0,
    delete: 0
  }
  return await API.graphql({
    query: createStaffRole,
    variables: { input: staff_role }
  }).then((res) => {
    return res.data.createStaffRole
  }).catch((error) => {
    console.log(error)
    return null
  })
}

export default {
  apiAccountCreate,
  apiAssociateCreate,
  apiStaffCreate,
  getAccount,
  getStaff,
  getAssociate,

  apiSetupStaffRoleCreate
}
