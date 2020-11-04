export default ({
  /**
   * @description 分页查询咨询列表
   */
  consultList: {
    method: 'get',
    url: '/v1/wx_consult/list'
  },
  /** 
   * @description 医生回复咨询
  */
  consultReply: {
    method: 'post',
    url: '/v1/wx_consult/:consultId/reply'
  },
  /**
   * @description 已读咨询回调接口
   */
  consultReadCallback: {
    method: 'post',
    url: '/v1/wx_consult/readCallBack'
  },
  /**
   * @description 获取咨询聊天列表
   */
  consultReplyList: {
    method: 'get',
    url: '/v1/wx_consult/:consultId/reply_list'
  },
  /**
   * @description 获取咨询详情
   */
  consultInfo: {
    method: 'get',
    url: '/v1/wx_consult/:consultId/info'
  },
  /**
   * @description 获取imToken
   */
  imToken: {
    method: 'get',
    url: '/v1/wx_consult/im/token'
  },
  /**
   * @description 获取imToken
   */
  consultOpen: {
    method: 'post',
    url: '/v1/wx_consult/:consultId/open'
  },
  /**
   * @description 创建医生问询单
   */
  doctorInquiry: {
    method: 'post',
    url: '/v1/wx_consult/doctorInquiry'
  }
})