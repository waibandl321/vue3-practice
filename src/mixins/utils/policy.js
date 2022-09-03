const FunctionPolicies = [
  {
    func_cd: "chat",
    crud: ["r"]
  },
  {
    func_cd: "file-store",
    crud: ["c", "r", "u", "d"]
  },
  {
    func_cd: "forum",
    crud: ["r"]
  },
  {
    func_cd: "master-company",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-brand",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-area",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-position",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-shop",
    portal_role: ["admin", "manager"]
  },
  {
    func_cd: "master-employee",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-role",
    portal_role: ["admin"]
  },
  {
    func_cd: "master-facility",
    portal_role: ["admin"]
  }
]
export default {
  methods: {
    getPortalFunctionPolicies () {
      return FunctionPolicies
    }
  }
}