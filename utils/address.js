import { Base } from 'base.js'
import { Config } from 'config.js'
class Address extends Base {
  constructor() {
    super()
  }

  setAddressInfo(res){
    var province = res.provinceName || res.province,
        city = res.cityName || res.city,
      county = res.countyName || res.county,
        detail = res.detailInfo || res.detail
    var totalDetail = city + county + detail
    if(!this.isCenterCity(province)){
      totalDetail = province +totalDetail
    }
    return totalDetail
  }
  /** 是否为直辖市 */
  isCenterCity(name) {
    var centerCitys = ['北京市','天津市','重庆市','上海市'],
        flag = centerCitys.indexOf(name) >= 0
    return flag
  }
  
  submitAddress(data,callback){
    data = this._setUpAddress(data)
    var param = {
      url: 'address',
      type: 'post',
      data: data,
      sCallback: function(res){
        callback && callback(res)
      },
      eCallback: function(res){
        callback && callback(res)
      }
    }
    this.request(param)
  }

  _setUpAddress(res){
    var formData = {
      name: res.userName,
      province: res.provinceName,
      city: res.cityName,
      county: res.countyName,

    }
  }
}

export {
  Address
}