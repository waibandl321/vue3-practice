const SystemRoles = [
  {
    role_cd: 'admin',
    role_name: '管理者',
    portal_role: 'admin'
  },
  {
    role_cd: 'officer',
    role_name: '役員',
    portal_role: 'officer'
  },
  {
    role_cd: 'areamanager',
    role_name: 'エリアマネージャー',
    portal_role: 'manager'
  },
  {
    role_cd: 'sv',
    role_name: 'スーパーバイザー',
    portal_role: 'manager'
  },
  {
    role_cd: 'manager',
    role_name: '店舗責任者',
    portal_role: 'manager'
  },
  {
    role_cd: 'staff',
    role_name: '店舗スタッフ',
    portal_role: 'staff'
  }
]
export default {
  methods: {
    getSystemRoleList () {
      return SystemRoles
    }
  }
}
