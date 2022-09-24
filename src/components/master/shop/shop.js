import shopApiFunc from '@/mixins/api/master/shop'
import employeeApiFunc from '@/mixins/api/master/employee'
import accountApiFunc from '@/mixins/api/account'

export default {
  async mixinGetShopStaff (_shop) {
    const results = await shopApiFunc.apiGetShopStaffList(_shop.company_shop_cd)
    for (const staff of results) {
      staff.employee = await employeeApiFunc.apiGetEmployeeRelateStaffId(staff.staff_id)
      staff.staff_role = await accountApiFunc.apiGetStaffRole(staff.staff_id)
    }
    return results
  }
}