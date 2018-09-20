import {Config} from '../utils/config.js'
import {Token} from '../utils/token.js'

class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl
  }


  request(params,noRefeach) {
    var url = this.baseRequestUrl + params.url
    var that = this
    wx.request({
      url: url,
      data: params.data,
      method: params.type ? params.type : 'GET',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function(res) {

        var code = res.statusCode.toString()
        var startChar = code.charAt(0)

        if(startChar == '2'){
          params.sCallback && params.sCallback(res.data)
        }else{
          if(code == '401'){
            // 令牌失效
            if (!noRefeach){
              that._refetch(params)
            }
          }
          if(noRefeach){
            params.eCallback && params.eCallback(res.data)
          }
          
        }

        
      },
      fail: function(err) {
        console.log(err)
      },

    })
  }

  _refetch(params){
    var token = new Token()
    token.getTokenFromServer((token)=>{
      this.request(params, true)
    })
  }


  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }
}

export {
  Base
}