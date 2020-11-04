export default ({
  /**
   * @description 登录接口
   */
  login: {
    method: 'post',
    url: '/v1/auth/login'
  },
  /**
   * @description 登录接口
   */
  logout: {
    method: 'post',
    url: '/v1/auth/logout'
  },
  /** 
   * @description 获取密钥
  */
  getEncryptKey: {
    method: 'get',
    url: '/v1/auth/encryptKey'
  },
  /**
   * @description 刷新 JWT
   */
  refreshJWT: {
    method: 'post',
    url: '/v1/auth/token/refresh'
  },
  /**
   * @description 获取用户信息
   */
  getUserInfo: {
    method: 'get',
    url: '/v1/sysUser/info'
  }
})