export default ({
  /**
   * @description 查询异常体征
   */
  signRecordAbnormal: {
    method: 'get',
    url: '/v1/signRecord/abnormal'
  },
  /**
   * @description 查询未读体征
   */
  signRecordUnRead: {
    method: 'get',
    url: '/v1/signRecord/unRead'
  },
  /**
   * @description 查询关注人的体征
   */
  signRecordFocusOn: {
    method: 'get',
    url: '/v1/signRecord/focusOn'
  },
  /**
   * @description 查询所有体征
   */
  signRecordALL: {
    method: 'get',
    url: '/v1/signRecord/all'
  },
  /**
   * @description 查询最新的异常体征
   */
  signMonitoringAbnormal: {
    method: 'get',
    url: '/v1/workGroup/signMonitoring/abnormal'
  },
  /**
   * @description 查询关注人的最新体征
   */
  signMonitoringFocus: {
    method: 'get',
    url: '/v1/workGroup/signMonitoring/focusOn'
  },
  /**
   * @description 查询所有人的最新体征
   */
  signMonitoringALL: {
    method: 'get',
    url: '/v1/workGroup/signMonitoring/all'
  },
  /**
   * @description 查询用户近期的体征信息
   */
  signRecordUser: {
    method: 'get',
    url: '/v1/signRecord/user'
  }
})