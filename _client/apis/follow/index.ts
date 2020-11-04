export default ({
  /**
   * @description 日历条件查询随访
   */
  followPlanList: {
    method: 'get',
    url: '/v1/followPlan/list'
  },
  /**
   * @description 随访详情
   */
  followDetail: {
    method: 'get',
    url: '/v1/followPlan/:userId'
  },
  /**
   * @description 完成随访
   */
  followExecuted: {
    method: 'post',
    url: '/v1/followPlan/:id/executed'
  },
  /**
   * @description 删除随访
   */
  followDetailDelete: {
    method: 'post',
    url: '/v1/followPlan/:id/delete'
  },
  /**
   * @description 新增随访
   */
  addFollow: {
    method: 'post',
    url: '/v1/followPlan'
  },
  /**
   * @description 修改随访
   */
  modifyFollow: {
    method: 'put',
    url: '/v1/followPlan/:id'
  }
})