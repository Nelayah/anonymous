export default ({
  /**
   * @description 登录接口
   */
  login: {
    method: 'post',
    url: '/v1/auth/login'
  },
  /**
   * @description 登出接口
   */
  logout: {
    method: 'post',
    url: '/v1/auth/logout'
  },
  /**
   * @description 注册接口
   */
  register: {
    method: 'post',
    url: '/v1/auth/register'
  }
});