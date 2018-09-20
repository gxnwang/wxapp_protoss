import {Config} from 'config.js'

class Token{
  constructor(){
  
    this.verifyUrl = Config.restUrl + 'token/verify'
    this.tokenUrl = Config.restUrl + 'token/user'
  }


  /**校验令牌是否有效 */
  verify(){
    /**
     * 先从本地缓存中查找token
     * 如果查不到则向服务器请求新的token
     * 如果能查到，则要向服务器验证token
     */

    var token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServer()
    }else{
      this._verifyFromServer(token)
    }
  }

  // 向服务器校验token
  _verifyFromServer(token){
    var that = this
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function(res){
        var vaild = res.data.isValid
        if(!vaild){
          // 如果验证token失败，则重新请求token
          that.getTokenFromServer()
        }
      }
    })
  }

  // 从服务器获取token
  getTokenFromServer(callback){
    var that = this
    wx.login({
      success:function(res){
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function(res){
            wx.setStorageSync('token', res.data.token)
            callback && callback(res.data.token)
          }
        })
      }
    })
  }

}

export {Token}