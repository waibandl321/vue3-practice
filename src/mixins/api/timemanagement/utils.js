const MANAGE_LEFT_MENU = [
  {
    key: 'daily',
    name: '日常業務',
    children: [
      {
        key: 'task',
        name: 'タスク',
        route: '/timemanagement/manage/task'
      },
      {
        key: 'template',
        name: 'テンプレート',
        route: '/timemanagement/manage/template'
      },
      {
        key: 'pattern',
        name: '業務パターン',
        route: '/timemanagement/manage/pattern'
      },
    ]
  },
  {
    key: 'checksheet',
    name: 'チェックシート',
    route: '/timemanagement/manage/checksheet'
  },
  {
    key: 'emergency',
    name: '臨時タスク',
    route: '/timemanagement/manage/emergency'
  },
]

export default {
  getTimngManageMenu () {
    return MANAGE_LEFT_MENU
  }
}