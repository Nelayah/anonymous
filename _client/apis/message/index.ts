export default ({
  /**
   * @description 删除站内信
   */
  deleteWebsiteNotify: {
    method: 'post',
    url: '/v1/websiteNotify/delete'
  },
  /** 
   * @description 已读站内信
  */
  readWebsiteNotify: {
    method: 'post',
    url: '/v1/websiteNotify/read'
  },
  /**
   * @description 获取站内信
   */
  getWebsiteNotify: {
    method: 'get',
    url: '/v1/websiteNotify'
  },
  /**
   * @description 获取未读站内信统计
   */
  unreadCount: {
    method: 'get',
    url: '/v1/websiteNotify/unread/count'
  },
  /**
   * @description 点击app通知
   */
  pushNotifyRead: {
    method: 'post',
    url: '/v1/pushNotify/click'
  }
})