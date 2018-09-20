import {Base} from '../../utils/base.js'

class Order extends Base {
  constructor(){
    super()
    this._storageKeyName = 'newOrder'
  }

  doOrder(param,callback){
    var that = this
    var allParams = {
      url: 'order',
      type: 'POST',
      data: {products:param},
      sCallback: function(data){
        that.execSetStorageSync(true)
        callback && callback(res)          
      }
    }
    this.request(allParams)
  }

  /** 本地缓存 保存/更新 */
  execSetStorageSync(data){
    wx.setStorageSync(this._storageKeyName, data)
  }

}

export {Order}