export default ({
  /**
   * @description 首页统计数据
   */
  statistics: {
    method: 'get',
    url: '/v1/personalCenter/statistics'
  },
  /**
   * @description 查询工作组内的档案
   */
  archivesUser: {
    method: 'get',
    url: '/v1/workGroup/archivesUser'
  },
  /**
   * @description 搜索系统用户
   */
  roleUserUnit: {
    method: 'get',
    url: '/v1/sysUser/role_user_unit'
  },
  /**
   * @description 数据字典
   */
  dictionary: {
    method: 'get',
    url: '/v1/dictionary/typeDetails'
  }
})