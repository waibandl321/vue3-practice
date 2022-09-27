import { API } from 'aws-amplify'
import { createAccounts, createAssociate, createStaff, createStaffRole, updateStaffRole } from '@/graphql/mutations'
import { listAccounts, listAssociates, listStaff, listStaffRoles } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

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
async function apiStaffCreate (associate, company, invitation = null, invitation_staff_id = null) {
  const _staff = {
    staff_id: invitation_staff_id ?? uuid.v4(),
    associate_id: associate.associate_id,
    company_cd: company.company_cd,
    company_group_cd: company.id,
    invite_key: invitation.invitation_id,
    status: 0,
    delete: 0
  }
  return await API.graphql({
    query: createStaff,
    variables: { input: _staff }
  }).then((res) => {
    console.log('created staff', res);
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
  const result = await API.graphql({
    query: listAccounts,
    variables: { filter: filter }
  })

  return result.data.listAccounts.items[0]
}
async function getAssociate (account) {
  const filter = {
    account_id: {
      eq: account.account_id
    }
  }
  const result = await API.graphql({
    query: listAssociates,
    variables: { filter: filter }
  })
  return result.data.listAssociates.items[0]
}
async function getStaff (associate) {
  const filter = {
    associate_id: {
      eq: associate.associate_id
    }
  }
  const result = await API.graphql({
    query: listStaff,
    variables: { filter: filter }
  })
  return result.data.listStaff.items[0]
}

// スタッフリール
async function apiSetupStaffRoleCreate (staff, invitation_role = null) {
  const staff_role = {
    role_cd: invitation_role ?? 'admin',
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

async function apiGetStaffRole (staff_id) {
  const filter = {
    staff_id: {
      eq: staff_id
    }
  }
  const result = await API.graphql({
    query: listStaffRoles,
    variables: { filter: filter }
  })
  return result.data.listStaffRoles.items[0]
}

async function apiUpdateStaffRole (staff_id, role) {
  const staff_role = {
    id: role.id,
    role_cd: role.role_cd,
    staff_id: staff_id,
    company_cd: store.getters.companyCd
  }
  await API.graphql({
    query: updateStaffRole,
    variables: { input: staff_role }
  })
}

export default {
  apiAccountCreate,
  apiAssociateCreate,
  apiStaffCreate,
  getAccount,
  getStaff,
  getAssociate,

  apiSetupStaffRoleCreate,
  apiGetStaffRole,
  apiUpdateStaffRole
}
